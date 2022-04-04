<?php

namespace App\Controller;

use App\Entity\StyleFeature;
use App\Repository\StyleFeatureRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StyleFeatureController extends AppController
{
    private EntityManagerInterface $em;
    private StyleFeatureRepository $styleFeatureRepository;

    public function __construct(EntityManagerInterface $em, StyleFeatureRepository $styleFeatureRepository)
    {
        $this->em = $em;
        $this->styleFeatureRepository = $styleFeatureRepository;
    }

    #[Route('/style-feature', name: 'style-feature_get', methods: ['GET'])]
    public function get_style_features(): Response
    {
        try {
            $values = $this->styleFeatureRepository->findAll();
            $values_array = [];

            foreach ($values as $value) {
                $value_template = [
                    'id' => $value->getId(),
                    'feature_name' => $value->getFeatureName(),
                    'class_name' => $value->getClassName()
                ];
                array_push($values_array, $value_template);
            }

            return $this->response($values_array);

        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'errors' => 'Server error'
            ];

            return $this->response($data, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/style-feature', name: 'style-feature_add', methods: ['POST'])]
    public function add_style_feature(Request $request): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            $style_feature = new StyleFeature();
            $style_feature->setFeatureName($request->get('feature_name'));
            $style_feature->setClassName($request->get('class_name'));

            if ($this->styleFeatureRepository->findBy([
                'feature_name' => $request->get('feature_name'),
                'class_name' => $request->get('class_name')
            ])) {
                return $this->response(json_encode('Feature in this class already exist!'), Response::HTTP_CONFLICT);
            }

            $this->em->persist($style_feature);
            $this->em->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Feature added in class successfully',
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

    #[Route('/style-feature/{id}', name: 'style-feature_delete', methods: ['DELETE'])]
    public function delete_style_feature($id): Response
    {
        try {
            $style_feature = $this->styleFeatureRepository->find($id);

            if (!$style_feature) {
                return $this->response(json_encode('Invalid feature in class id!'), Response::HTTP_BAD_REQUEST);
            }

            $this->em->remove($style_feature);
            $this->em->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Feature deleted in class successfully',
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
