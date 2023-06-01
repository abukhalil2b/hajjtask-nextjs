"use client";

import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import TextInput from "@/components/ui/TextInput";
import axios from "@/lib/axios";
import { useEffect, useRef, useState } from "react";
import InputError from "./ui/InputError";

const NewTaskForMyTeamModal = ({ day, user }) => {
  const ref = useRef(null);

  const [state, setState] = useState({
    title: "",
    start_at: "",
    end_at: "",
  });

  const [errors, setErrors] = useState({
    title: [],
    start_at: [],
    end_at: [],
  });

  function hasError() {
    return Object.values(errors).flat().length > 0;
  }

  function handleChange(event) {
    const { name, value } = event.currentTarget;

    setState({
      ...state,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    const { title, start_at, end_at } = state;
    console.log(day);
    axios
      .post("/api/task/for_my_team/store", {
        title,
        start_at,
        end_at,
        day_id: day.id,
        user_id: user.id,
      })
      .then((res) => {
        setState({ title: "", start_at: "", end_at: "" });
        setErrors({ title: [], start_at: [], end_at: [] });
        setShow(false);
      })
      .catch((error) => {
        if (error.response?.status != 422) throw error;
        console.log(error.response.data.errors);
        setErrors(error.response.data.errors);
      });

    event.preventDefault();
  }

  const [show, setShow] = useState(hasError());

  useEffect(() => {
    function handleClickOutside(event) {
      console.log(ref.current.contains(event.target), show);
      if (ref.current && !ref.current.contains(event.target)) {
        setShow(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="mt-1 space-y-6">
      <PrimaryButton onClick={() => setShow(true)}>+ أضف له مهمة</PrimaryButton>

      <div
        className={`${
          show ? "fixed" : "hidden"
        } inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50`}
      >
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        <div
          className="mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-2xl sm:mx-auto"
          ref={ref}
        >
          <form onSubmit={handleSubmit} className="p-3 text-[#035b62]">
            {/* @csrf */}

            <div className="mt-6">
              <TextInput
                type="text"
                name="title"
                className="mt-1 block w-full"
                placeholder="المهمة"
                onInput={handleChange}
              />
              <InputError messages={errors.title || []} />
            </div>

            <div className="mt-6 border p-1 rounded">
              <div>الوقت المتوقع لإنجاز المهمة:</div>
              <div className="mt-2 w-full flex gap-1">
                من
                <TextInput
                  type="time"
                  className=""
                  name="start_at"
                  onInput={handleChange}
                />
                إلى
                <TextInput
                  type="time"
                  className=""
                  name="end_at"
                  onInput={handleChange}
                />
              </div>
              <InputError messages={errors.start_at || []} />
              <InputError messages={errors.end_at || []} />
            </div>

            <div className="mt-6 flex justify-between">
              <SecondaryButton onClick={() => setShow(false)} className="w-14">
                إلغ
              </SecondaryButton>

              <PrimaryButton className="ml-3 w-14">حفظ</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTaskForMyTeamModal;
