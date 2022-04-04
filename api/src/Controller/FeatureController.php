<?php

namespace App\Controller;

use App\Entity\Feature;
use App\Repository\FeatureRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FeatureController extends AppController
{
    private EntityManagerInterface $em;
    private FeatureRepository $featureRepository;

    public function __construct(EntityManagerInterface $em, FeatureRepository $featureRepository)
    {
        $this->em = $em;
        $this->featureRepository = $featureRepository;
    }

    #[Route('/feature', name: 'feature_get', methods: ['GET'])]
    public function get_features(): Response
    {
        try {
            $features = $this->featureRepository->findAll();
            $features_array = [];

            foreach ($features as $feature) {
                $feature_template = [
                    'id' => $feature->getId(),
                    'name' => $feature->getName()
                ];
                array_push($features_array, $feature_template);
            }

            return $this->response($features_array);

        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'errors' => 'Server error'
            ];

            return $this->response($data, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/feature', name: 'feature_add', methods: ['POST'])]
    public function add_feature(Request $request): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            $feature = new Feature();
            $feature->setName($request->get('name'));

            if ($this->featureRepository->findBy(['name' => $request->get('name')])) {
                return $this->response(json_encode('Feature with this name already exist!'), Response::HTTP_CONFLICT);
            }

            $this->em->persist($feature);
            $this->em->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Feature added successfully',
            ];

            return $this->response($data);

        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'errors' => 'Server error'
            ];

            return $this->response($data, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/feature/{id}', name: 'feature_delete', methods: ['DELETE'])]
    public function delete_feature($id): Response
    {
        try {
            $feature = $this->featureRepository->find($id);

            if (!$feature) {
                return $this->response(json_encode('Invalid feature id!'), Response::HTTP_BAD_REQUEST);
            }

            $this->em->remove($feature);
            $this->em->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Feature deleted successfully',
            ];

            return $this->response($data);

        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'errors' => 'Server error'
            ];

            return $this->response($data, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
