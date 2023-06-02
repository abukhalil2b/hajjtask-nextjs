"use client";

import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import TextInput from "@/components/ui/TextInput";
import axios from "@/lib/axios";
import { useEffect, useRef, useState } from "react";

const NewSubtaskModal = ({ task, onSubtaskAdd }) => {
  const ref = useRef(null);

  const [state, setState] = useState({
    title: "",
  });

  const [errors, setErrors] = useState({
    title: [],
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
    const { title } = state;

    axios
      .post("/api/task/subtask/store", {
        title,
        task_id: task.id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      .then((res) => {
        onSubtaskAdd(res.data)
        setState({ title: "" });
        setErrors({ title: [] });
        setShow(false);
      })
      .catch((error) => {
        if (error.response?.status != 422) throw error;

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
      <PrimaryButton
        className="w-16"
        onClick={(e) => {
          setShow(true);
        }}
      >
        + جديد
      </PrimaryButton>

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
          <form onSubmit={handleSubmit} className="p-2 text-[#035b62]">
            {/* @csrf */}

            <div className="mt-6 flex items-center gap-1">
              <TextInput
                type="text"
                name="title"
                className="mt-1 block w-full"
                onInput={handleChange}
              />
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

export default NewSubtaskModal;
