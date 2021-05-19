import React from "react";
import {Link} from "react-router-dom";

interface SummaryStepProps {
    collectedData: {
        email: string;
        age: number;
        firstname: string;
        lastname: string;
    };
}

const SummaryStep: React.FC<SummaryStepProps> = (props) => {
    return (
        <>
            <div>Firstname: {props.collectedData.firstname}</div>
            <div>Lastname: {props.collectedData.lastname}</div>
            <div>Email: {props.collectedData.email}</div>
            <div>Age: {props.collectedData.age}</div>
            <div>
                <Link to="/purchased=dev_ins">Purchase</Link>
            </div>
        </>
    );
};

export default SummaryStep;
