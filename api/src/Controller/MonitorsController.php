<?php

namespace App\Controller;

use App\Entity\Monitor;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class MonitorsController extends AbstractController
{
    #[Route('/monitors', methods: ['GET'])]
    public function getActivityTypes(EntityManagerInterface $manager): JsonResponse {
        try {
            $monitorRepository = $manager->getRepository(Monitor::class);
            $monitors = $monitorRepository->findAll();

            if (!$monitors) {
                return new JsonResponse([
                    'cod' => JsonResponse::HTTP_BAD_REQUEST,
                    'message' => 'Monitors not found'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            $data = array_map(function ($monitor) {
                return [
                    'id' => $monitor->getId(),
                    'name' => $monitor->getName(),
                    'email' => $monitor->getEmail(),
                    'phone' => $monitor->getPhone(),
                    'photo' => $monitor->getPhoto(),
                ];
            }, $monitors);
            
            return new JsonResponse($data);

        } catch (\Exception $e) {
            return new JsonResponse([
                'cod' => JsonResponse::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $e->getMessage()
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/monitors', methods: ['POST'])]
    public function createMonitor(Request $request, EntityManagerInterface $manager): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (is_null($data)) {
                return new JsonResponse([
                    'cod' => JsonResponse::HTTP_BAD_REQUEST,
                    'message' => 'Invalid JSON data'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            if (empty($data['name']) || empty($data['email']) || empty($data['phone']) || empty($data['photo'])) {
                return new JsonResponse([
                    'cod' => JsonResponse::HTTP_BAD_REQUEST,
                    'message' => 'Fields: name, email, phone and photo are required'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }
            
            $monitor = new Monitor();
            $monitor->setName($data['name']);
            $monitor->setEmail($data['email']);
            $monitor->setPhone($data['phone']);
            $monitor->setPhoto($data['photo']);

            $manager->persist($monitor);
            $manager->flush();

            return new JsonResponse([
                'cod' => JsonResponse::HTTP_OK,
                'message' => 'Monitor created successfully'
            ], JsonResponse::HTTP_OK);

        } catch (\Exception $e) {
            $statusCode = JsonResponse::HTTP_INTERNAL_SERVER_ERROR;

            return new JsonResponse([
                'cod' => $statusCode,
                'message' => $e->getMessage()
            ], $statusCode);
        }
        
    }

    #[Route('/monitors/{id}', methods: ['PUT'])]
    public function updateMonitor(int $id, Request $request, EntityManagerInterface $manager): JsonResponse
    {
        try{
            $data = json_decode($request->getContent(), true);

            if (is_null($data)) {
                return new JsonResponse([
                    'cod' => JsonResponse::HTTP_BAD_REQUEST,
                    'message' => 'Invalid JSON data'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            if (empty($data['name']) || empty($data['email']) || empty($data['phone']) || empty($data['photo'])) {
                return new JsonResponse([
                    'cod' => JsonResponse::HTTP_BAD_REQUEST,
                    'message' => 'Fields: name, email, phone and photo are required'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            $monitor = $manager->getRepository(Monitor::class)->find($id);

            if (!$monitor) {
                return new JsonResponse([
                    'cod' => JsonResponse::HTTP_BAD_REQUEST,
                    'message' => 'Monitor not found'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }
            
            $monitor->setName($data['name']);
            $monitor->setEmail($data['email']);
            $monitor->setPhone($data['phone']);
            $monitor->setPhoto($data['photo']);
            $manager->persist($monitor);
            $manager->flush();
            

            return new JsonResponse([
                'cod' => JsonResponse::HTTP_OK,
                'message' => 'Monitor updated successfully'
            ], JsonResponse::HTTP_OK);

        }catch (\Exception $e){
            $statusCode = JsonResponse::HTTP_INTERNAL_SERVER_ERROR;

            return new JsonResponse([
                'cod' => $statusCode,
                'message' => $e->getMessage()
            ], $statusCode);
        }
    }

    #[Route('/monitors/{id}', methods: ['DELETE'])]
    public function deleteMonitor(int $id, EntityManagerInterface $manager) : JsonResponse 
    {
        try{
            $monitor = $manager->getRepository(Monitor::class)->find($id);

            if (is_null($monitor)) {
                return new JsonResponse([
                    'cod' => JsonResponse::HTTP_BAD_REQUEST,
                    'message' => 'Monitor not found'
                ], JsonResponse::HTTP_BAD_REQUEST);
            }

            $manager->remove($monitor);
            $manager->flush();

            return new JsonResponse([
                'cod' => JsonResponse::HTTP_CREATED,
                'message' => "Monitor deleted"
            ], JsonResponse::HTTP_CREATED);

        }catch (\Exception $e){
            return new JsonResponse([
                'cod' => JsonResponse::HTTP_INTERNAL_SERVER_ERROR,
                'message' => $e->getMessage()
            ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
