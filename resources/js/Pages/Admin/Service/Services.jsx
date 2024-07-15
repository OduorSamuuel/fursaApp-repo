import React, { useState, useEffect } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { toast } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import SidebarLayout from '@/Layouts/Admin/SidebarLayout';
import TopBar from '@/Layouts/Admin/TopBar';
import Card from '../../../Components/Card';
import Sidebar from '@/Layouts/Admin/Sidebar';

function Services() {
    const { provider, serviceDetails, countyName,pricingTiers,counties, availability: initialAvailability } = usePage().props;
   
    console.log(counties);
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [isEditingAdditional, setIsEditingAdditional] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [serviceName, setServiceName] = useState('');
    const [previews, setPreviews] = useState([null, null, null]);
    const [availability, setAvailability] = useState(initializeAvailability(initialAvailability));

    // Initialize availability with default values for each day
    function initializeAvailability(initial) {
        const availabilityData = {};
        daysOfWeek.forEach(day => {
            const initialData = initial.find(item => item.day_of_week.toLowerCase() === day.toLowerCase());
            availabilityData[day.toLowerCase()] = initialData ? {
                open_time: initialData.open || '',
                close_time: initialData.close || '',
                closed: initialData.closed === '1',
            } : { open_time: '', close_time: '', closed: false };
        });
        return availabilityData;
    }

    useEffect(() => {
        // Initialize availability data if availableData is provided
        if (initialAvailability && initialAvailability.length > 0) {
            setAvailability(initializeAvailability(initialAvailability));
        }
    }, [initialAvailability]);

    const { data, setData, processing, errors,progress,put } = useForm({
        company_name: provider?.company_name || '',
        service_type: provider?.service_type || '',
        contact_number: provider?.contact_number || '',
        address: provider?.address || '',
        county_id: provider?.county_id || '',
        service_image: null,
        service_description: serviceDetails?.service_description || '',
        images: [],
        pricing_tiers:
            pricingTiers && pricingTiers.length
                ? pricingTiers
                : [
                      { name: 'Basic', price: '', description: '' },
                      { name: 'Standard', price: '', description: '' },
                      { name: 'Premium', price: '', description: '' },
                  ],
    });
    useEffect(() => {
        if (pricingTiers) {
            setData('pricing_tiers', pricingTiers);
        }
    }, [pricingTiers]);
    const handleEdit = () => {
        if (isEditing) {
            put(route('admin.services.update', provider.id), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Service details updated successfully.');
                    setIsEditing(false);
                },
                onError: () => {
                    toast.error('Failed to update service details.');
                },
            });
        } else {
            setIsEditing(true);
        }
    };
    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newPreviews = [...previews];

        if (files.length > 3 || newPreviews.filter(preview => preview !== null).length + files.length > 3) {
            alert('You can only upload a maximum of 3 images.');
            return;
        }
        const updatedFiles = [...data.images];
        files.forEach((file, index) => {
            const previewIndex = newPreviews.findIndex(preview => preview === null);
            if (previewIndex !== -1) {
                newPreviews[previewIndex] = URL.createObjectURL(file);
                updatedFiles.push(file);
            }
        });

        setData('images', updatedFiles);
        setPreviews(newPreviews);
    };
    const handleRemoveImage = (index) => {
        const newPreviews = [...previews];
        const updatedFiles = [...data.images];

        newPreviews[index] = null;
        updatedFiles.splice(index, 1);

        setData('images', updatedFiles);
        setPreviews(newPreviews);
    };
    const handleEditAdditional = () => {
        if (isEditingAdditional) {
            const formData = new FormData();

            // Prepare availability data as an array of days
            const availabilityArray = Object.keys(availability).map(day => ({
                day_of_week: day,
                open_time: availability[day].open_time,
                close_time: availability[day].close_time,
                closed: availability[day].closed ? '1' : '0', // Convert boolean to '1' or '0'
            }));

            availabilityArray.forEach((avail, index) => {
                formData.append(`availability[${index}][day_of_week]`, avail.day_of_week);
                formData.append(`availability[${index}][open_time]`, avail.open_time);
                formData.append(`availability[${index}][close_time]`, avail.close_time);
                formData.append(`availability[${index}][closed]`, avail.closed);
            });

            pricingTiers.forEach((tier, index) => {
                formData.append(`pricing_tiers[${index}][name]`, tier.name);
                formData.append(`pricing_tiers[${index}][price]`, tier.price);
                formData.append(`pricing_tiers[${index}][description]`, tier.description);
            });

            formData.append('service_description', data.service_description);

            data.images.forEach((file, index) => {
                formData.append(`image_${index + 1}`, file);
            });

            Inertia.post(route('admin.services.updateadditional', provider.id), formData)
                .then(() => {
                    toast.success('Additional details updated successfully.');
                    setIsEditingAdditional(false);
                    setData('images', []); // Clear images after successful submission
                })
                .catch((error) => {
                    console.error('Failed to update additional details:', error);
                    toast.error('Failed to update additional details.');
                });
        } else {
            setIsEditingAdditional(true);
        }
    };

    const handleAvailabilityChange = (day, field, value) => {
        if (field === 'closed') {
            // Handle checkbox toggle for closed status
            const updatedAvailability = {
                ...availability,
                [day]: {
                    ...availability[day],
                    closed: value,
                    open_time: value ? '' : availability[day].open_time,
                    close_time: value ? '' : availability[day].close_time,
                },
            };

            setAvailability(updatedAvailability);
        } else {
            // Handle time input changes
            setAvailability(prevAvailability => ({
                ...prevAvailability,
                [day]: {
                    ...prevAvailability[day],
                    [field]: value,
                },
            }));
        }
    };

    return (
        <TopBar >
    <Sidebar>
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Your Service</h2>
                    <button
                        onClick={handleEdit}
                        className={`px-4 py-2 rounded-md flex items-center ${
                            isEditing ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                        }`}
                        disabled={processing}
                    >
                        <FontAwesomeIcon icon={isEditing ? faSave : faEdit} className="mr-2" />
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                </div>
                {processing && (
                    <div className="flex justify-center items-center">
                        <FontAwesomeIcon icon={faSpinner} spin className="text-blue-500" />
                    </div>
                )}
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       
                        <Card title="Company Name">
                            <p className="text-gray-700">{provider.company_name}</p>
                            {isEditing && (
                                <input
                                    type="text"
                                    name="company_name"
                                    value={data.company_name}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        </Card>
                        <Card title="Service Type">
                            <p className="text-gray-700">{provider.service_type}</p>
                            {isEditing && (
                                <input
                                    type="text"
                                    name="service_type"
                                    value={data.service_type}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        </Card>
                        <Card title="Contact Number">
                            <p className="text-gray-700">{provider.contact_number}</p>
                            {isEditing && (
                                <input
                                    type="text"
                                    name="contact_number"
                                    value={data.contact_number}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        </Card>
                        <Card title="Address">
                            <p className="text-gray-700">{provider.address}</p>
                            {isEditing && (
                                <input
                                    type="text"
                                    name="address"
                                    value={data.address}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        </Card>
                        <Card title="Service Image">
                            {}
                            {isEditing && (
                                <input
                                    type="file"
                                    name="service_image"
                                    onChange={handleFileChange}
                                    className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        </Card>
                        <Card title="County">
                            <p className="text-gray-700">{countyName}</p>
                            {isEditing && (
                                <select
                                    name="county_id"
                                    value={data.county_id}
                                    onChange={handleChange}
                                    className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  {counties.map((county) => (
                                            <option key={county.id} value={county.id}>
                                                {county.name}
                                            </option>
                                        ))}
                                </select>
                            )}
                        </Card>
                    </div>
                    <Card>
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Additional Details</h2>
            <button
                        onClick={handleEditAdditional}
                        className={`px-4 py-2 rounded-md flex items-center ${
                            isEditingAdditional ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                        }`}
                        disabled={processing}
                    >
                        <FontAwesomeIcon icon={isEditingAdditional ? faSave : faEdit} className="mr-2" />
                        {isEditingAdditional ? 'Save' : 'Edit'}
                    </button>

        </div>
      
        <Card title="Availability">
                    <div className="mt-4">
                        {daysOfWeek.map(day => (
                            <div key={day} className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-700">{day}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700">Open Time</label>
                                        <input
                                            type="time"
                                            className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            disabled={!isEditingAdditional || availability[day.toLowerCase()].closed}
                                            value={availability[day.toLowerCase()].open_time || ''}
                                            onChange={e => handleAvailabilityChange(day.toLowerCase(), 'open_time', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Close Time</label>
                                        <input
                                            type="time"
                                            className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            disabled={!isEditingAdditional || availability[day.toLowerCase()].closed}
                                            value={availability[day.toLowerCase()].close_time || ''}
                                            onChange={e => handleAvailabilityChange(day.toLowerCase(), 'close_time', e.target.value)}
                                        />
                                    </div>
                                    <div className="col-span-2 flex items-center mt-2">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            disabled={!isEditingAdditional}
                                            checked={availability[day.toLowerCase()].closed || false}
                                            onChange={e => handleAvailabilityChange(day.toLowerCase(), 'closed', e.target.checked)}
                                        />
                                        <label className="text-gray-700">Closed</label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

           <div className='mt-3 mb-3'>
           <Card title="Description" >
                <p className="text-gray-700 ">{serviceDetails ? serviceDetails.service_description : ''}</p>
                {isEditingAdditional && (
                    <textarea
                        name="service_description"
                        value={data.service_description}
                        onChange={(e) => setData('service_description', e.target.value)}
                        className="w-full border rounded-md px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                )}
            </Card>
           
           </div>
       
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
            <Card title="Upload Images (Max 3)">
                <div className="flex flex-col">
                    <div className="relative">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <button
                            type="button"
                            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 focus:outline-none"
                        >
                            Browse
                        </button>
                    </div>
                    {errors.images && <div className="text-red-500 mt-2">{errors.images}</div>}
                </div>
                <div className="flex space-x-4 mt-4">
                    {previews.map((preview, index) => (
                        <div
                            key={index}
                            className="relative w-32 h-32 border rounded overflow-hidden bg-gray-200 flex items-center justify-center"
                        >
                            {preview ? (
                                <>
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none"
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </button>
                                </>
                            ) : (
                                <span className="text-gray-500">Image {index + 1}</span>
                            )}
                        </div>
                    ))}
                </div>
                {progress && (
                    <div className="mt-4">
                        <progress value={progress.percentage} max="100" className="w-full">
                            {progress.percentage}%

                        </progress>
                </div>
            )}
        </Card>
    </div>
    <Card title="Pricing Tiers">
{['Basic', 'Standard', 'Premium'].map((tierName, index) => (
    <div key={index} className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{tierName}</h3>
        <p className="text-gray-700">{data.pricing_tiers[index]?.price || 'No price available'}</p>
        <p className="text-gray-700">{data.pricing_tiers[index]?.description || 'No description available'}</p>
        {isEditingAdditional && (
            <div className="mt-2 space-y-2">
                <input
                    type="text"
                    name={`pricing_tiers[${index}].price`}
                    placeholder="Price"
                    value={data.pricing_tiers[index]?.price || ''}
                    onChange={(e) => {
                        const newTiers = [...data.pricing_tiers];
                        if (!newTiers[index]) {
                            newTiers[index] = { name: tierName, price: '', description: '' };
                        }
                        newTiers[index].price = e.target.value;
                        setData('pricing_tiers', newTiers);
                    }}
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    name={`pricing_tiers[${index}].description`}
                    placeholder="Description"
                    value={data.pricing_tiers[index]?.description || ''}
                    onChange={(e) => {
                        const newTiers = [...data.pricing_tiers];
                        if (!newTiers[index]) {
                            newTiers[index] = { name: tierName, price: '', description: '' };
                        }
                        newTiers[index].description = e.target.value;
                        setData('pricing_tiers', newTiers);
                    }}
                    className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        )}
    </div>
))}
</Card>

</Card>

                    
                   
                 
                </div>
            
                              
            </div>

            </Sidebar>
    </TopBar>
    
    );
}

export default Services;
