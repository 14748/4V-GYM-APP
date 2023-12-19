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

    #[ORM\ManyToOne(inversedBy: 'activities')]
    #[ORM\JoinColumn(nullable: false)]
    private ?ActivityType $activity_type = null;

    #[ORM\OneToMany(mappedBy: 'activity', targetEntity: Monitor::class)]
    private Collection $monitors;

    #[ORM\Column(length: 255)]
    private ?string $datestart = null;

    #[ORM\Column(length: 255)]
    private ?string $dateend = null;

    public function __construct()
    {
        $this->monitors = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getActivityType(): ?ActivityType
    {
        return $this->activity_type;
    }

    public function setActivityType(?ActivityType $activity_type): static
    {
        $this->activity_type = $activity_type;

        return $this;
    }

    /**
     * @return Collection<int, Monitor>
     */
    public function getMonitors(): Collection
    {
        return $this->monitors;
    }

    public function addMonitor(Monitor $monitor): static
    {
        if (!$this->monitors->contains($monitor)) {
            $this->monitors->add($monitor);
            $monitor->setActivity($this);
        }

        return $this;
    }

    public function removeMonitor(Monitor $monitor): static
    {
        if ($this->monitors->removeElement($monitor)) {
            // set the owning side to null (unless already changed)
            if ($monitor->getActivity() === $this) {
                $monitor->setActivity(null);
            }
        }

        return $this;
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
}
