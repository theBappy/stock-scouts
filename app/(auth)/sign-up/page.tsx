"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import InputField from "../_forms/input-field";
import SelectField from "../_components/select-field";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import { CountrySelectField } from "../_components/country-select-field";
import FooterLink from "../_forms/footer-link";

const SignUpPage = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "US",
      investmentGoals: "Growth",
      riskTolerance: "Medium",
      preferredIndustry: "Technology",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="form-title">Sing up & Personalize</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          register={register}
          error={errors.fullName}
          validation={{ required: "Full name is required", minLength: 2 }}
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
        />
        <InputField
          register={register}
          error={errors.email}
          validation={{
            required: "Email name is required",
            pattern: /^\w+@\w+\.\w+$/,
            message: "Email address is required",
          }}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
        />
        <InputField
          name="password"
          label="Password"
          placeholder="Enter a strong password"
          type="password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is required", minLength: 8 }}
        />
        <CountrySelectField
          name="country"
          label="Country"
          control={control}
          error={errors.country}
          required
        />
        <SelectField
          name="investmentGoals"
          label="Investment Goal"
          placeholder="Select your investment goal"
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />
        <SelectField
          name="riskTolerance"
          label="Risk Tolerance"
          placeholder="Select your risk level"
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />
        <SelectField
          name="preferredIndustry"
          label="Preferred Industry"
          placeholder="Select your preferred industry"
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Creating account" : "Start Your Investing Journey"}
        </Button>
        <FooterLink
          text="Already have an account?"
          href="/sign-in"
          linkText="Sign in"
        />
      </form>
    </>
  );
};

export default SignUpPage;
