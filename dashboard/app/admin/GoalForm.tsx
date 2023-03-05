'use client'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function GoalForm() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    message: Yup.string().required('Message is required'),
    co2_index: Yup.number().required('Co2 index goal is required').min(400, 'Must be greater than 400').max(2500, 'Must be less than 2500').typeError(''),
    voc_index: Yup.number().required('VoC index goal is required').min(0, 'Must be greater than 0').max(500, 'Must be less than 500').typeError(''),
    energy_consumption: Yup.number().required('Energy consumption goal is required').min(0, 'Must be greater than 0').typeError(''),
    tds_index: Yup.number().required('TDS index goal is required').min(0, 'Must be greater than 0').max(500, 'Must be less than 500').typeError('')
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  function onSubmit(data: any) {
    alert(JSON.stringify(data));
  }

  return (
    <div className="w-full bg-black h-screen">
      <div className="h-96"></div>
      <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gray-900 w-full shadow rounded p-8 sm:p-12 -mt-72">
          <p className="text-3xl font-bold leading-7 text-center text-white">Contact Us</p>
          <form className="space-y-6" action="" method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="md:flex items-center mt-12">
              <div className="w-full md:w-1/2 flex flex-col">
                <label className="font-semibold leading-none text-gray-300">Name</label>
                <input {...register('name')} type="text" className={`leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded ${errors.name ? 'is-invalid' : ''}`} />
                <span className="text-red-500 text-sm">{errors.name?.message}</span>
              </div>
              <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label className="font-semibold leading-none text-gray-300">Phone</label>
                <input {...register('phone')} type="phone" className={`leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded ${errors.phone ? 'is-invalid' : ''}`} />
                <span className="text-red-500 text-sm">{errors.phone?.message}</span>
              </div>
            </div>
            <div>
              <div className="w-full flex flex-col mt-8">
                <label className="font-semibold leading-none text-gray-300">Message</label>
                <textarea {...register('message')} type="text" className={`h-40 text-base leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-800 border-0 rounded ${errors.message ? 'is-invalid' : ''}`} placeholder="Please include number of sensor packages needed at your university. Feel free to include any other details relevent to your sustainability project."></textarea>
                <span className="text-red-500 text-sm">{errors.message?.message}</span>
              </div>
            </div>
            <p className="text-3xl font-bold leading-7 text-center text-white ">Goals</p>
            {/* Numerical inputs for specific goals with validation */}
            <div className="md:flex items-center mt-12">
              <div className="w-full md:w-1/2 flex flex-col">
                <label className="font-semibold leading-none text-gray-300">CO2 Concentration</label>
                <input {...register('co2_index')} type="number" className={`leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded ${errors.co2_index ? 'is-invalid' : ''}`} placeholder="parts per million" />
                <span className="text-red-500 text-sm">{errors.co2_index?.message}</span>
              </div>
              <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label className="font-semibold leading-none text-gray-300">VOC Index</label>
                <input {...register('voc_index')} type="number" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" placeholder="(0-500) range" />
                <span className="text-red-500 text-sm">{errors.voc_index?.message}</span>
              </div>
            </div>
            <div className="md:flex items-center mt-12">
              <div className="w-full md:w-1/2 flex flex-col">
                <label className="font-semibold leading-none text-gray-300">Energy Consumption</label>
                <input {...register('energy_consumption')} type="number" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" placeholder="W"/>
                <span className="text-red-500 text-sm">{errors.energy_consumption?.message}</span>  
                </div>
              <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                <label className="font-semibold leading-none text-gray-300">Total Dissolved Solids in Water</label>
                <input {...register('tds_index')} type="number" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" placeholder="parts per million" />
                <span className="text-red-500 text-sm">{errors.tds_index?.message}</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <button className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">
                Send message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}