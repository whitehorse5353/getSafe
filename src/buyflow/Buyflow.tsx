import React, {useState} from "react";
import SummaryStep from "./SummaryStep";
import CustomInput from "../components/CustomInput";
import {
    isNotEmpty,
    isNumberLessThan,
    isNumberGreaterThan,
    isValidEmail
} from "../utils/index";

interface BuyflowProps {
    productId: ProductIds;
}

export enum ProductIds {
    devIns = "dev_ins"
}

const PRODUCT_IDS_TO_NAMES = {
    [ProductIds.devIns]: "Developer Insurance"
};

const initialState = {
    email: "",
    age: 0,
    firstname: "",
    lastname: ""
};

const Buyflow: React.FC<BuyflowProps> = (props) => {
    const [currentStep, setStep] = useState("firstname");
    const [collectedData, updateData] = useState(initialState);
    const getStepCallback = (nextStep: string) => (field: string, value: any) => {
        updateData({...collectedData, [field]: value});
        setStep(nextStep);
    };
    return (
        <>
            <h4>Buying {PRODUCT_IDS_TO_NAMES[props.productId]}</h4>

            {(currentStep === "firstname" && (
                <CustomInput
                    label="First Name"
                    name="firstname"
                    type="text"
                    isValidField={isNotEmpty}
                    handler={getStepCallback("lastname")}
                />
            )) ||
            (currentStep === "lastname" && (
                <CustomInput
                    label="Last Name"
                    name="lastname"
                    type="text"
                    isValidField={isNotEmpty}
                    handler={getStepCallback("email")}
                />
            )) ||
            (currentStep === "email" && (
                <CustomInput
                    label="Email"
                    name="email"
                    type="text"
                    isValidField={isValidEmail}
                    handler={getStepCallback("age")}
                />
            )) ||
            (currentStep === "age" && (
                <CustomInput
                    label="Age"
                    name="age"
                    type="number"
                    isValidField={[isNumberGreaterThan(0), isNumberLessThan(125)]}
                    handler={getStepCallback("summary")}
                />
            )) ||
            (currentStep === "summary" && (
                <SummaryStep collectedData={collectedData}/>
            ))}
        </>
    );
};

export default Buyflow;
