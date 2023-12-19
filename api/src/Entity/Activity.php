<?php

namespace App\Entity;

use App\Repository\ActivityRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ActivityRepository::class)]
class Activity
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $datestart = null;

    #[ORM\Column(length: 255)]
    private ?string $dateend = null;

    #[ORM\ManyToOne(inversedBy: 'activities')]
    private ?ActivityType $activityType = null;

    #[ORM\ManyToOne(inversedBy: 'activities')]
    private ?Monitor $monitor = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDatestart(): ?string
    {
        return $this->datestart;
    }

    public function setDatestart(string $datestart): static
    {
        $this->datestart = $datestart;

        return $this;
    }

    public function getDateend(): ?string
    {
        return $this->dateend;
    }

    public function setDateend(string $dateend): static
    {
        $this->dateend = $dateend;

        return $this;
    }

    public function getActivityType(): ?ActivityType
    {
        return $this->activityType;
    }

    public function setActivityType(?ActivityType $activityType): static
    {
        $this->activityType = $activityType;

        return $this;
    }

    public function getMonitor(): ?Monitor
    {
        return $this->monitor;
    }

    public function setMonitor(?Monitor $monitor): static
    {
        $this->monitor = $monitor;

        return $this;
    }
}
