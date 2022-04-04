<?php

namespace App\Entity;

use App\Repository\StyleFeatureValueRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: StyleFeatureValueRepository::class)]
class StyleFeatureValue
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $class_name;

    #[ORM\Column(type: 'string', length: 255)]
    private $feature_name;

    #[ORM\Column(type: 'string', length: 255)]
    private $feature_value;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getClassName(): ?string
    {
        return $this->class_name;
    }

    public function setClassName(string $class_name): self
    {
        $this->class_name = $class_name;

        return $this;
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

    public function getFeatureValue(): ?string
    {
        return $this->feature_value;
    }

    public function setFeatureValue(string $feature_value): self
    {
        $this->feature_value = $feature_value;

        return $this;
    }
}
