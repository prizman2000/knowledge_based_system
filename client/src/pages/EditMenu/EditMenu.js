import React from "react";
import Class from "../../components/Class/Class";
import Feature from "../../components/Feature/Feature";
import ClassFeatures from "../../components/ClassFeatures/ClassFeatures";
import FeatureValues from "../../components/FeatureValues/FeatureValues";
import ClassFeaturesValues from "../../components/ClassFeaturesValues/ClassFeaturesValues";

export default function EditMenu(props) {

    return (
        <>
            {props.sideMenu === '1' ?
                <Class/>
            : props.sideMenu === '2' ?
                <Feature/>
            : props.sideMenu === '3' ?
                <ClassFeatures/>
            : props.sideMenu === '4' ?
                <FeatureValues/>
            :
                <ClassFeaturesValues/>
            }
        </>
    );
}