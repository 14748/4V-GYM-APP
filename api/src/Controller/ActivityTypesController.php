<?php

namespace App\Controller;

use App\Entity\ActivityType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ActivityTypesController extends AbstractController
{
    #[Route('/activity-types', methods: ['GET'])]
    public function getActivityTypes(EntityManagerInterface $manager): JsonResponse {
        try {
            $activityTypesRepository = $manager->getRepository(ActivityType::class);
            $activityTypes = $activityTypesRepository->findAll();

            if (!$activityTypes) {
                return new JsonResponse([
                    'cod' => 404,
                    'message' => 'Activity not found'
                ], 404);
            }

            $data = array_map(function ($activityType) {
                return [
                    'id' => $activityType->getId(),
                    'name' => $activityType->getName(),
                    'number-monitors' => $activityType->getNumbermonitors()
                ];
            }, $activityTypes);
            
            return new JsonResponse($data);

        } catch (\Exception $e) {
            return new JsonResponse([
                'cod' => JsonResponse::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $e->getMessage()
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

}
