<?php

namespace App\Controller;

use App\Entity\StyleFeature;
use App\Entity\StyleFeatureValue;
use App\Repository\StyleFeatureValueRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StyleFeatureValueController extends AppController
{
    private EntityManagerInterface $em;
    private StyleFeatureValueRepository $styleFeatureValueRepository;

    public function __construct(EntityManagerInterface $em, StyleFeatureValueRepository $styleFeatureValueRepository)
    {
        $this->em = $em;
        $this->styleFeatureValueRepository = $styleFeatureValueRepository;
    }

    #[Route('/style-feature-value', name: 'style-feature-value_get', methods: ['GET'])]
    public function get_style_feature_values(): Response
    {
        try {
            $values = $this->styleFeatureValueRepository->findAll();
            $values_array = [];

            foreach ($values as $value) {
                $value_template = [
                    'id' => $value->getId(),
                    'class_name' => $value->getClassName(),
                    'feature_name' => $value->getFeatureName(),
                    'feature_value' => $value->getFeatureValue()
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

    #[Route('/style-feature-value', name: 'style-feature-value_add', methods: ['POST'])]
    public function add_style_feature_value(Request $request): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            $style_feature_value = new StyleFeatureValue();
            $style_feature_value->setClassName($request->get('class_name'));
            $style_feature_value->setFeatureName($request->get('feature_name'));
            $style_feature_value->setFeatureValue($request->get('feature_value'));

            if ($this->styleFeatureValueRepository->findBy([
                'feature_name' => $request->get('feature_name'),
                'class_name' => $request->get('class_name'),
                'feature_value' => $request->get('feature_value')
            ])) {
                return $this->response(json_encode('Feature value in this class already exist!'), Response::HTTP_CONFLICT);
            }

            $this->em->persist($style_feature_value);
            $this->em->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Feature value added in class successfully',
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

    #[Route('/style-feature-value/{id}', name: 'style-feature-value_delete', methods: ['DELETE'])]
    public function delete_style_feature_value($id): Response
    {
        try {
            $style_feature_value = $this->styleFeatureValueRepository->find($id);

            if (!$style_feature_value) {
                return $this->response(json_encode('Invalid feature value in class id!'), Response::HTTP_BAD_REQUEST);
            }

            $this->em->remove($style_feature_value);
            $this->em->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Feature value deleted from class successfully',
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
