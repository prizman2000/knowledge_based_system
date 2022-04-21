<?php

namespace App\Controller;

use App\Repository\StyleFeatureRepository;
use App\Repository\StyleFeatureValueRepository;
use phpDocumentor\Reflection\Types\This;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CompletenessCheckController extends AppController
{
    private StyleFeatureRepository $styleFeatureRepository;
    private StyleFeatureValueRepository $styleFeatureValueRepository;

    public function __construct(StyleFeatureValueRepository $styleFeatureValueRepository, StyleFeatureRepository $styleFeatureRepository)
    {
        $this->styleFeatureValueRepository = $styleFeatureValueRepository;
        $this->styleFeatureRepository = $styleFeatureRepository;
    }

    #[Route('/completeness-check', name: 'completeness_check', methods: ['GET'])]
    public function completeness_check(): Response
    {
        try {
            $styleFeatures = $this->styleFeatureRepository->findAll();


            foreach ($styleFeatures as $item)
            {
                $res = $this->styleFeatureValueRepository->findOneBy(["class_name" => $item->getClassName(), "feature_name" => $item->getFeatureName()]);
                dd($res);
            }

            return $this->response();
        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'errors' => $e->getMessage()
            ];

            return $this->response($data, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
