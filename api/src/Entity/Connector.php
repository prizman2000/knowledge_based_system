<?php

namespace App\Entity;

use App\Repository\ConnectorRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ConnectorRepository::class)]
class Connector
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 255)]
    private $style_name;

    #[ORM\Column(type: 'string', length: 255)]
    private $feature_name;

    #[ORM\Column(type: 'array', nullable: true)]
    private $options = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStyleName(): ?string
    {
        return $this->style_name;
    }

    public function setStyleName(string $style_name): self
    {
        $this->style_name = $style_name;

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

    public function getOptions(): ?array
    {
        return $this->options;
    }

    public function setOptions(?array $options): self
    {
        $this->options = $options;

        return $this;
    }
}
