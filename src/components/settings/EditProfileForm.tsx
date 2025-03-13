import type React from "react";
import { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "@heroicons/react/16/solid";
import { Popover, Transition } from "@headlessui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useStore } from "../../store";
import { Icon } from "@iconify/react";
import SuccessPopup from "../SuccessPopup";

const profileFormSchema = z.object({
  avatar: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.date({
    required_error: "Date of birth is required",
  }),
  presentAddress: z.string().min(5, "Present address is required"),
  permanentAddress: z.string().min(5, "Permanent address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(5, "Valid postal code is required"),
  country: z.string().min(2, "Country is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

function EditProfileForm() {
  const { user, updateUser } = useStore();
  const [avatar, setAvatar] = useState(user?.avatar);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      avatar: user?.avatar,
      name: user?.name || "Charlene Reed",
      username: user?.username || "charlenereed",
      email: user?.email || "charlenereed@gmail.com",
      dateOfBirth: user?.dateOfBirth
        ? new Date(user.dateOfBirth)
        : new Date("2025-03-10"),
      presentAddress: user?.presentAddress || "San Jose, California, USA",
      permanentAddress: user?.permanentAddress || "San Jose, California, USA",
      city: user?.city || "San Jose",
      postalCode: user?.postalCode || "45962",
      country: user?.country || "USA",
      password: user?.password || "",
    },
  });

  const dateOfBirth = watch("dateOfBirth");

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
        setValue("avatar", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      setIsSubmitting(true);

      // 🟢 Simulate an API call to update the user
      await new Promise((resolve) => setTimeout(resolve, 1000));

      updateUser({
        avatar: data.avatar,
        name: data.name,
        username: data.username,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        presentAddress: data.presentAddress,
        permanentAddress: data.permanentAddress,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
      });

      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 py-6 px-2 md:pl-7 md:pr-0 mt-5 flex flex-col lg:flex-row lg:items-start space-x-[56px] min-h-[75vh] relative"
    >
      <SuccessPopup successMessage={successMessage} />

      {/* Avatar Upload */}
      <div className="w-full md:w-auto">
        <div className="flex items-center justify-center space-x-4">
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden">
              <img
                src={avatar}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 size-[30px] flex items-center justify-center right-0 p-1 bg-[#232323] rounded-full shadow-lg cursor-pointer"
            >
              <Icon
                icon="fa6-solid:pencil"
                width="16"
                height="16"
                color="white"
              />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="flex-1 h-full w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm text-gray-700">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-input-border"
              } focus:outline-none focus:ring-1 focus:text-primary-black focus:ring-primary-black text-input-text`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm  text-gray-700">
              User Name
            </label>
            <input
              id="username"
              type="text"
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.username
                  ? "border-red-500 focus:ring-red-500"
                  : "border-input-border"
              } focus:outline-none focus:ring-1 focus:text-primary-black focus:ring-primary-black text-input-text`}
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm  text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-input-border"
              } focus:outline-none focus:ring-1 focus:text-primary-black focus:ring-primary-black text-input-text`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-input-border"
              } focus:outline-none focus:ring-1 focus:text-primary-black focus:ring-primary-black text-input-text`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <label
              htmlFor="dateOfBirth"
              className="block text-sm  text-gray-700"
            >
              Date of Birth
            </label>
            <Popover className="relative">
              <Popover.Button
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.dateOfBirth
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                } focus:!outline-none focus:ring-1 focus:text-primary-black focus:ring-primary-black text-input-text flex justify-between items-center`}
              >
                <span>
                  {dateOfBirth ? format(dateOfBirth, "PPP") : "Select date"}
                </span>
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 mt-1 w-full">
                  <div className="bg-white shadow-lg rounded-md p-2 border border-gray-200">
                    <DatePicker
                      selected={dateOfBirth}
                      onChange={(date: any) => setValue("dateOfBirth", date)}
                      inline
                      maxDate={new Date()}
                      minDate={new Date("1900-01-01")}
                      showYearDropdown
                      dropdownMode="select"
                    />
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          {/* Present Address */}
          <div className="space-y-2">
            <label
              htmlFor="presentAddress"
              className="block text-sm  text-gray-700"
            >
              Present Address
            </label>
            <input
              id="presentAddress"
              type="text"
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.presentAddress
                  ? "border-red-500 focus:ring-red-500"
                  : "border-input-border"
              } focus:outline-none focus:ring-1 focus:text-primary-black focus:ring-primary-black text-input-text`}
              {...register("presentAddress")}
            />
            {errors.presentAddress && (
              <p className="text-red-500 text-sm">
                {errors.presentAddress.message}
              </p>
            )}
          </div>

          {/* Permanent Address */}
          <div className="space-y-2">
            <label
              htmlFor="permanentAddress"
              className="block text-sm  text-gray-700"
            >
              Permanent Address
            </label>
            <input
              id="permanentAddress"
              type="text"
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.permanentAddress
                  ? "border-red-500 focus:ring-red-500"
                  : "border-input-border"
              } focus:outline-none focus:ring-1 focus:text-primary-black focus:ring-primary-black text-input-text`}
              {...register("permanentAddress")}
            />
            {errors.permanentAddress && (
              <p className="text-red-500 text-sm">
                {errors.permanentAddress.message}
              </p>
            )}
          </div>

          {/* City */}
          <div className="space-y-2">
            <label htmlFor="city" className="block text-sm  text-gray-700">
              City
            </label>
            <input
              id="city"
              type="text"
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.city
                  ? "border-red-500 focus:ring-red-500"
                  : "border-input-border"
              } focus:outline-none focus:ring-1 focus:text-primary-black focus:ring-primary-black text-input-text`}
              {...register("city")}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          {/* Postal Code */}
          <div className="space-y-2">
            <label
              htmlFor="postalCode"
              className="block text-sm  text-gray-700"
            >
              Postal Code
            </label>
            <input
              id="postalCode"
              type="text"
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.postalCode
                  ? "border-red-500 focus:ring-red-500"
                  : "border-input-border"
              } focus:outline-none focus:ring-1 focus:text-primary-black focus:ring-primary-black text-input-text`}
              {...register("postalCode")}
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm">
                {errors.postalCode.message}
              </p>
            )}
          </div>

          {/* Country */}
          <div className="space-y-2">
            <label htmlFor="country" className="block text-sm  text-gray-700">
              Country
            </label>
            <input
              id="country"
              type="text"
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.country
                  ? "border-red-500 focus:ring-red-500"
                  : "border-input-border"
              } focus:outline-none focus:ring-1 focus:text-primary-black focus:ring-primary-black text-input-text`}
              {...register("country")}
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country.message}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-10 ">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 !bg-gray-900 w-full md:w-[190px] text-white rounded-lg hover:!bg-gray-800 focus:!outline-none focus:!ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default EditProfileForm;
