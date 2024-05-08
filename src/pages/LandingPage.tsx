import {
  LockClosedIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@mui/material";
import { StyledButton } from "../styles/StyledButton";
import { useContext } from "react";
import { GlobalNavigationContext } from "../contexts/GlobalNavigationContext";
const features = [
  {
    name: "Financial Tracking",
    description:
      "Keep track of your expenses and assets and allow the power of our technology to simplify your companies finances.",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Advanced Security",
    description:
      "We know how important it is to keep your information private. That is why we have state of the art technology that ensures just that.",
    icon: LockClosedIcon,
  },
  {
    name: "Deep Insights",
    description:
      "Along with this service, you will have free access to data driven insights to help you navigate your finances.",
    icon: ChartBarIcon,
  },
  {
    name: "Customer Service",
    description:
      "We know that life can be tough, that is why we are here 24/7 to assist you in any area.",
    icon: ChatBubbleBottomCenterIcon,
  },
];
export default function LandingPage() {
  const { ...nav } = useContext(GlobalNavigationContext);
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Less time managing more time doing.
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            NodeSpace CRM
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Expense Tracking Made Simple
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <StyledButton>
        <Button
          onClick={() => nav.nav("/sign-up")}
          variant="contained"
          sx={{
            bgcolor: "#4F46E5",
            width: "13rem",
            "&:hover": {
              bgcolor: "white",
              color: "#4F46E5",
            },
          }}
        >
          Create an Account
        </Button>
        <Button
          onClick={() => nav.nav("/sign-in")}
          variant="outlined"
          sx={{
            borderColor: "#4F46E5",
            color: "#4F46E5",
            width: "13rem",
            "&:hover": {
              borderColor: "#4F46E5",
              bgcolor: "#4F46E5",
              color: "white",
            },
          }}
        >
          Sign In
        </Button>
      </StyledButton>
    </div>
  );
}
