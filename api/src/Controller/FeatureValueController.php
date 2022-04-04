<?php

namespace App\Controller;

use App\Entity\FeatureValue;
use App\Repository\FeatureValueRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FeatureValueController extends AppController
{
    private EntityManagerInterface $em;
    private FeatureValueRepository $featureValueRepository;

    public function __construct(EntityManagerInterface $em, FeatureValueRepository $featureValueRepository)
    {
        $this->em = $em;
        $this->featureValueRepository = $featureValueRepository;
    }

    #[Route('/feature-value', name: 'feature-value_get', methods: ['GET'])]
    public function get_feature_values(): Response
    {
        try {
            $values = $this->featureValueRepository->findAll();
            $values_array = [];

            foreach ($values as $value) {
                $value_template = [
                    'id' => $value->getId(),
                    'feature_name' => $value->getFeatureName(),
                    'value' => $value->getValue()
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

    #[Route('/feature-value', name: 'feature-value_add', methods: ['POST'])]
    public function add_feature_value(Request $request): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            $feature_value = new FeatureValue();
            $feature_value->setFeatureName($request->get('feature_name'));
            $feature_value->setValue($request->get('value'));

            if ($this->featureValueRepository->findBy([
                'feature_name' => $request->get('feature_name'),
                'value' => $request->get('value')
            ])) {
                return $this->response(json_encode('Feature value with this value already exist!'), Response::HTTP_CONFLICT);
            }

            $this->em->persist($feature_value);
            $this->em->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Feature value added successfully',
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

    #[Route('/feature-value/{id}', name: 'feature-value_delete', methods: ['DELETE'])]
    public function delete_feature_value($id): Response
    {
        try {
            $feature_value = $this->featureValueRepository->find($id);

            if (!$feature_value) {
                return $this->response(json_encode('Invalid feature value id!'), Response::HTTP_BAD_REQUEST);
            }

            $this->em->remove($feature_value);
            $this->em->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Feature value deleted successfully',
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
