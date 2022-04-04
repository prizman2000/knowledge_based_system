<?php

namespace App\Controller;

use App\Entity\Style;
use App\Repository\StyleRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StyleController extends AppController
{
    private EntityManagerInterface $em;
    private StyleRepository $styleRepository;

    public function __construct(EntityManagerInterface $em, StyleRepository $styleRepository)
    {
        $this->em = $em;
        $this->styleRepository = $styleRepository;
    }

    #[Route('/style', name: 'style_get', methods: ['GET'])]
    public function get_styles(): Response
    {
        try {
            $styles = $this->styleRepository->findAll();
            $styles_array = [];

            foreach ($styles as $style) {
                $style_template = [
                    'id' => $style->getId(),
                    'name' => $style->getName()
                ];
                array_push($styles_array, $style_template);
            }

            return $this->response($styles_array);

        } catch (\Exception $e) {
            $data = [
                'status' => Response::HTTP_INTERNAL_SERVER_ERROR,
                'errors' => 'Server error'
            ];

            return $this->response($data, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/style', name: 'style_add', methods: ['POST'])]
    public function add_style(Request $request): Response
    {
        try {
            $request = $this->transformJsonBody($request);

            $style = new Style();
            $style->setName($request->get('name'));

            if ($this->styleRepository->findBy(['name' => $request->get('name')])) {
                return $this->response(json_encode('Style with this name already exist!'), Response::HTTP_CONFLICT);
            }

            $this->em->persist($style);
            $this->em->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Style added successfully',
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

    #[Route('/style/{id}', name: 'style_delete', methods: ['DELETE'])]
    public function delete_style($id): Response
    {
        try {
            $style = $this->styleRepository->find($id);

            if (!$style) {
                return $this->response(json_encode('Invalid style id!'), Response::HTTP_BAD_REQUEST);
            }

            $this->em->remove($style);
            $this->em->flush();

            $data = [
                'status' => Response::HTTP_OK,
                'success' => 'Style deleted successfully',
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
