import privateApi from "@/lib/axios-interceptor";
import { ChangeDisplayNameCredentials, ChangePasswordCredentials } from "@/schema/profile.schema";
import { AppointmentStatus } from "@/types/type";

export const updateDisplayName = async (data: ChangeDisplayNameCredentials) => {
  const response = await privateApi.put("/customers/me/profile", data)
  return response.data
}

export const changeCustomerPassword = async (
  data: ChangePasswordCredentials
) => {
  const response = await privateApi.patch(
    "/customers/me/change-password",
    data
  );
  return response.data;
};

export const uploadCustomerAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await privateApi.patch(
    "/customers/me/upload-avatar",
    formData
  );

  return response.data;
}

export const getCustomerAppointments = async ({
  startDate,
  endDate,
  status
}: {
  startDate?: string,
  endDate?: string,
  status?: string
}) => {
  const params = new URLSearchParams()

   if (startDate) params.append("startDate", startDate.toString())
   if (endDate) params.append("endDate", endDate.toString())
   if (status) params.append("status", status.toString().toUpperCase() as AppointmentStatus)

  const response = await privateApi.get(`/appointments?${params}`);
  return response.data;
};

export const deleteCustomerAccount = async () => {
  const response = await privateApi.delete("/customers/me/account");
  return response.data;
};

export const getAllCustomers = async () => {
  const response = await privateApi.get("/customers");
  return response.data;
};