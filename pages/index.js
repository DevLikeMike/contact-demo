import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    let { name, email, message } = data;
    const res = await fetch(`api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
      }),
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor='name'>Name: </label>
        <input
          type='text'
          name='name'
          id='name'
          {...register("name", { required: true, maxLength: 20 })}
        />
        <label htmlFor='email'>Email: </label>
        <input
          type='email'
          name='email'
          id='email'
          {...register("email", { required: true })}
        />
        <label htmlFor='message'>Your Message: </label>
        <textarea
          name='message'
          id='message'
          {...register("message", {
            required: true,
            maxLength: 1000,
            minLength: 25,
          })}
        ></textarea>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}
