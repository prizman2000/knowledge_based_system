<?php

namespace App\Repository;

use App\Entity\StyleFeatureValue;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\ORM\ORMException;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method StyleFeatureValue|null find($id, $lockMode = null, $lockVersion = null)
 * @method StyleFeatureValue|null findOneBy(array $criteria, array $orderBy = null)
 * @method StyleFeatureValue[]    findAll()
 * @method StyleFeatureValue[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class StyleFeatureValueRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, StyleFeatureValue::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(StyleFeatureValue $entity, bool $flush = true): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(StyleFeatureValue $entity, bool $flush = true): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    // /**
    //  * @return StyleFeatureValue[] Returns an array of StyleFeatureValue objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?StyleFeatureValue
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
