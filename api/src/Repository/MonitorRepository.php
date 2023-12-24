<?php

namespace App\Repository;

use App\Entity\Monitor;
use App\Entity\Activity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @extends ServiceEntityRepository<Monitor>
 *
 * @method Monitor|null find($id, $lockMode = null, $lockVersion = null)
 * @method Monitor|null findOneBy(array $criteria, array $orderBy = null)
 * @method Monitor[]    findAll()
 * @method Monitor[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MonitorRepository extends ServiceEntityRepository
{
    private EntityManagerInterface $entityManager;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $entityManager)
    {
        parent::__construct($registry, Monitor::class);
        $this->entityManager = $entityManager;
    }

    /**
     * Remove a given activity from all monitors that have it.
     */
    public function removeActivityFromMonitors($activityId)
    {
        $activity = $this->entityManager->getRepository(Activity::class)->find($activityId);

        if (!$activity) {
            throw new \Exception("Activity not found");
        }

        $monitors = $this->createQueryBuilder('monitor')
                    ->innerJoin('monitor.activities', 'activity')
                    ->andWhere('activity.id = :activityId')
                    ->setParameter('activityId', $activityId)
                    ->getQuery()
                    ->getResult();

        foreach ($monitors as $monitor) {
            $monitor->removeActivity($activity);
            $this->entityManager->persist($monitor);
        }

        $this->entityManager->remove($activity);
        $this->entityManager->flush();
    }

    public function disassociateMonitorsFromActivity($activityId)
    {
        $activity = $this->entityManager->getRepository(Activity::class)->find($activityId);

        if (!$activity) {
            throw new \Exception("Activity not found");
        }

        $monitors = $this->createQueryBuilder('monitor')
                    ->innerJoin('monitor.activities', 'activity')
                    ->andWhere('activity.id = :activityId')
                    ->setParameter('activityId', $activityId)
                    ->getQuery()
                    ->getResult();

        foreach ($monitors as $monitor) {
            $monitor->removeActivity($activity);  // Remove the activity from the monitor
            $this->entityManager->persist($monitor);
        }

        $this->entityManager->flush();  // Apply the changes to the database
    }
}

