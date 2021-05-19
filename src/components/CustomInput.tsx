import React, {useState} from "react";

type IsValidField = (value: string) => boolean;

interface CustomInputProps {
    label: string;
    name: string;
    type: string;
    handler: (field: string, value: string | number) => void;
    isValidField?: IsValidField[] | IsValidField;
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
    const {label, type, name, isValidField, handler} = props;
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState(false);
    return (
        <>
            <div>
                {label}:{" "}
                <input
                    onChange={({target: {value}}) => {
                        // Custom field validations
                        if (isValidField) {
                            const isValidInput =
                                typeof isValidField === "object" // when supplied array of validation predicates
                                    ? isValidField.reduce(
                                    (validationResults, validationRule, iDx) => {
                                        const hasValidationRuleFailed = validationRule(value);
                                        if (!validationResults && !iDx) {
                                            return !validationResults && hasValidationRuleFailed;
                                        }
                                        validationResults =
                                            validationResults && hasValidationRuleFailed;
                                        return validationResults;
                                    },
                                    false
                                    ) // reduces the validation predicate to identify the failing rule
                                    : isValidField(value); // when supplied with simple validation predicate

                            if (!isValidInput) {
                                setError(!isValidInput);
                            }
                            setError(isValidInput);
                        }
                        setInputValue(value);
                    }}
                    value={inputValue}
                    type={type}
                    name={name}
                ></input>
            </div>
            <button
                disabled={!error}
                onClick={() => {
                    handler(name, inputValue);
                    setInputValue("");
                    setError(false);
                }}
            >
                Next
            </button>
        </>
    );
};

export default CustomInput;
