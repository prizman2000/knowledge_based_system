<?php

namespace App\Controller;

use App\Repository\StyleFeatureValueRepository;
use App\Repository\StyleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class SolverController extends AppController
{
    private StyleRepository $styleRepository;
    private StyleFeatureValueRepository $styleFeatureValueRepository;

    public function __construct(StyleRepository $styleRepository, StyleFeatureValueRepository $styleFeatureValueRepository)
    {
        $this->styleRepository = $styleRepository;
        $this->styleFeatureValueRepository = $styleFeatureValueRepository;
    }

    #[Route('/solve', name: 'solver', methods: ['POST'])]
    public function solve(SerializerInterface $serializer, Request $request): Response
    {
        try {
            $request = $this->transformJsonBody($request);
            $inputData = $request->get("data");

            $styles = $this->styleRepository->findAll();
            $result = $styles;

            $styleValues = $this->styleFeatureValueRepository;
            for ($i = 0; $i < count($styles); $i++)
            {
                foreach (array_keys($inputData) as $key)
                {
                    foreach ($inputData[$key] as $value)
                    {
                        if (!$styleValues->findOneBy(["class_name" => $styles[$i]->getName(), "feature_name" => $key, "feature_value" => $value])) {
                            unset($result[$i]);
                        }
                    }
                }
            }
            return $this->response($serializer->serialize(array_values($result), 'json', [AbstractNormalizer::IGNORED_ATTRIBUTES => ['__initializer__', '__cloner__', '__isInitialized__']]));
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'errors' => $e->getMessage()
            ];

            return $this->response($data, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
