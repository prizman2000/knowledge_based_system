<?php

namespace App\Entity;

use App\Repository\FeatureValueRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FeatureValueRepository::class)]
class FeatureValue
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $feature_name;

    #[ORM\Column(type: 'string', length: 255)]
    private $value;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFeatureName(): ?string
    {
        return $this->feature_name;
    }

    public function setFeatureName(string $feature_name): self
    {
        $this->feature_name = $feature_name;

        return $this;
    }

    public function getValue(): ?string
    {
        return $this->value;
    }

    public function setValue(string $value): self
    {
        $this->value = $value;

        return $this;
    }
}
