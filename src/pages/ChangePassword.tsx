import PHForm from "@/components/form/PHForm";
import PHPassword from "@/components/form/PHPassword";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useChangePasswordMutation } from "@/redux/features/admin/User Management/userManagement.api";
import { logOut } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { TResponse } from "@/types";
import { Button, Card } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ChangePassword() {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Changing Password....");
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = await changePassword(data) as TResponse<any>
      console.log(res);
      if (res.data) {
        toast.success("Password Changed Successfully", {
          id: toastId,
        });
        dispatch(logOut());
        navigate("/login");
      }
      if (res.error) {
        toast.error(res.error.data.message, {
          id: toastId,
        });
      }
    } catch (err) {
      toast.error("Something went wrong", {
        id: toastId,
      });
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <Card className="w-1/4 mt-20">
        <CardHeader>
          <CardTitle className="text-center">Change Password</CardTitle>
        </CardHeader>
        <PHForm onSubmit={onSubmit}>
          <CardContent className="space-y-2">
            <PHPassword name="oldPassword" label="Old Password" />
            <PHPassword name="newPassword" label="New Password" />
          </CardContent>
          <CardFooter>
            <Button htmlType="submit" className="mx-auto">
              Submit
            </Button>
          </CardFooter>
        </PHForm>
      </Card>
    </div>
  );
}
