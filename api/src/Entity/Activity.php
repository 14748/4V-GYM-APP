<?php

namespace App\Entity;

use App\Repository\ActivityRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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

    #[ORM\ManyToOne(inversedBy: 'activity')]
    private ?ActivityType $activityType = null;

    #[ORM\OneToMany(mappedBy: 'activity', targetEntity: Monitor::class)]
    private Collection $monitor;

    public function __construct()
    {
        $this->monitor = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Monitor>
     */
    public function getMonitor(): Collection
    {
        return $this->monitor;
    }

    public function addMonitor(Monitor $monitor): static
    {
        if (!$this->monitor->contains($monitor)) {
            $this->monitor->add($monitor);
            $monitor->setActivity($this);
        }

        return $this;
    }

    public function removeMonitor(Monitor $monitor): static
    {
        if ($this->monitor->removeElement($monitor)) {
            // set the owning side to null (unless already changed)
            if ($monitor->getActivity() === $this) {
                $monitor->setActivity(null);
            }
        }

        return $this;
    }
}
