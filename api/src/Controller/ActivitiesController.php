<?php

namespace App\Controller;

use App\Entity\Activity;
use App\Entity\ActivityType;
use App\Entity\Monitor;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ActivitiesController extends AbstractController
{
    #[Route('/activities', methods: ['GET'])]
    public function getActivitiesWithMonitors(EntityManagerInterface $manager): JsonResponse
    {
        try {
            $activities = $manager->getRepository(Activity::class)->findAll();

            if (!$activities) {
                return new JsonResponse([
                    'cod' => JsonResponse::HTTP_BAD_REQUEST,
                    'message' => 'Activities not found'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            $data = array_map(function ($activity) {
                $monitors = $activity->getMonitor();

                $formattedMonitors = array_map(function (Monitor $monitor) {
                    return [
                        'id' => $monitor->getId(),
                        'name' => $monitor->getName(),
                        'email' => $monitor->getEmail(),
                        'phone' => $monitor->getPhone(),
                        'photo' => $monitor->getPhoto(),
                    ];
                }, $monitors->toArray());

                return [
                    'id' => $activity->getId(),
                    'activity_type' => $activity->getActivityType()->getId(),
                    'monitors' => $formattedMonitors,
                    'date_start' => $activity->getDatestart(),
                    'date_end' => $activity->getDateend(),
                ];
            }, $activities);

            return new JsonResponse($data);
        } catch (\Exception $e) {
            return new JsonResponse([
                'cod' => JsonResponse::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $e->getMessage()
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/activities', methods: ['POST'])]
    public function createActivityWithMonitors(Request $request, EntityManagerInterface $manager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (is_null($data)) {
                return new JsonResponse([
                    'cod' => JsonResponse::HTTP_BAD_REQUEST,
                    'message' => 'Invalid JSON data'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            if (empty($data['date_start']) || empty($data['date_end']) || empty($data['activity_type']) || empty($data['monitors'])) {
                return new JsonResponse([
                    'cod' => JsonResponse::HTTP_BAD_REQUEST,
                    'message' => 'Missing required fields: date_start, date_end, activity_type, monitors'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            $activityType = $manager->getRepository(ActivityType::class)->find($data['activity_type']);
            if (!$activityType) {
                return new JsonResponse([
                    'cod' => JsonResponse::HTTP_BAD_REQUEST,
                    'message' => 'Invalid activity_type ID'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            $activity = new Activity();
            
            $activity->setDatestart($data['date_start']);
            $activity->setDateend($data['date_end']);
            $activity->setActivityType($activityType);

            foreach ($data['monitors'] as $monitorData) {
                $monitor = $manager->getRepository(Monitor::class)->find($monitorData['id']);
                if ($monitor) {
                    $activity->addMonitor($monitor); 
                } else {
                    return new JsonResponse([
                        'cod' => JsonResponse::HTTP_BAD_REQUEST,
                        'message' => "Invalid monitor ID: " . $monitorData['id']
                    ], JsonResponse::HTTP_BAD_REQUEST);
                }
            }

            $manager->persist($activity);
            $manager->flush();

            return new JsonResponse([
                'cod' => JsonResponse::HTTP_OK,
                'message' => 'Activity created successfully',
                'activityId' => $activity->getId()
            ], JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse([
                'cod' => JsonResponse::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $e->getMessage()
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    #[Route('/activities/{id}', methods: ['PUT'])]
    public function updateMonitor(int $id, Request $request, EntityManagerInterface $manager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (is_null($data)) {
                return new JsonResponse([
                    'cod' => JsonResponse::HTTP_BAD_REQUEST,
                    'message' => 'Invalid JSON data'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            if (empty($data['datestart']) || empty($data['dateend']) || empty($data['activityType'])) {
                return new JsonResponse([
                    'cod' => JsonResponse::HTTP_BAD_REQUEST,
                    'message' => 'Fields: datestart, dateend, activityType are required'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            $activity = $manager->getRepository(Activity::class)->find($id);

            if (!$activity) {
                return new JsonResponse([
                    'cod' => JsonResponse::HTTP_BAD_REQUEST,
                    'message' => 'Activity not found'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            $activityType = $manager->getRepository(ActivityType::class)->find($data['activityType']);
            if (!$activityType) {
                return new JsonResponse([
                    'cod' => JsonResponse::HTTP_BAD_REQUEST,
                    'message' => 'ActivityType not found'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            $activity->setDatestart($data['datestart']);
            $activity->setDateend($data['dateend']);
            $activity->setActivityType($activityType); 

            $monitorRepository = $manager->getRepository(Monitor::class);
            $monitorRepository->disassociateMonitorsFromActivity($id);

            if (isset($data['monitors']) && is_array($data['monitors'])) {
                foreach ($data['monitors'] as $monitorData) {
                    $monitor = $manager->getRepository(Monitor::class)->find($monitorData['id']);
                    if ($monitor) {
                        $activity->addMonitor($monitor);
                    }
                }
            }

            $manager->persist($activity);
            $manager->flush();

            return new JsonResponse([
                'cod' => JsonResponse::HTTP_OK,
                'message' => 'Activity updated successfully'
            ], JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            $statusCode = JsonResponse::HTTP_INTERNAL_SERVER_ERROR;

            return new JsonResponse([
                'cod' => $statusCode,
                'message' => $e->getMessage()
            ], $statusCode);
        }
    }




    #[Route('/activities/{id}', methods: ['DELETE'])]
    public function deleteActivity($id, EntityManagerInterface $manager): JsonResponse
    {
        try {
            $monitorRepository = $manager->getRepository(Monitor::class);
            $monitorRepository->removeActivityFromMonitors($id);

            return new JsonResponse([
                'message' => 'Activity and its associations successfully deleted.'
            ], JsonResponse::HTTP_OK);
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => $e->getMessage()
            ], JsonResponse::HTTP_BAD_REQUEST);
        }
    }
}
