"use client";
import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from './checkbox';
import { Calendar } from "@/components/ui/calendar"; // Add this import
import { format } from "date-fns"; // Add this import
import { CalendarIcon } from "lucide-react"; // Add this import
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // Add these imports
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
export default function EventRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter(); // Initialize the router
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',

    // Step 2: Event Selection
    eventType: 'CONFERENCE', // Default value
    date: undefined as Date | undefined, // Changed from string to Date | undefined

    // Step 3: Preferences
    dietaryRequirements: '',
    accommodationNeeded: false,
    transportationNeeded: false,
    specialRequests: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

const handleCheckboxChange = (name: keyof typeof formData, checked: boolean | string): void => {
    setFormData({
        ...formData,
        [name]: checked === "indeterminate" ? false : Boolean(checked)
    });
};

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');
    
    // Format the data correctly before submission
    const submissionData = {
      ...formData,
      // Convert Date object to ISO string for the backend
      date: formData.date ? formData.date.toISOString() : undefined,
      // Ensure all required fields are present and properly formatted
      dietaryRequirements: formData.dietaryRequirements || 'None',
      specialRequests: formData.specialRequests || 'None',
      // Ensure these are boolean values
      accommodationNeeded: Boolean(formData.accommodationNeeded),
      transportationNeeded: Boolean(formData.transportationNeeded)
    };
    
    console.log('Form submitted:', submissionData);
    
    const res = await fetch('/api/event-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData),
    });
    
    const data = await res.json();
    if (res.ok) {
      setStatus('Registration successful!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        eventType: 'CONFERENCE',
        date: undefined,
        dietaryRequirements: '',
        accommodationNeeded: false,
        transportationNeeded: false,
        specialRequests: ''
      });
      setCurrentStep(1);
    } else {
      setStatus(`Error: ${data.error || 'Something went wrong'}`);
      console.error('Error details:', data);
    }
    
    setTimeout(() => setStatus(''), 3000); // Reset status after 3 seconds
const user = localStorage.getItem('token');
  if (!user) {
    router.push("./login");
    return alert('User not logged in , Login First'); // Return alert while redirecting
  }
}

  // Step 1: Personal Details
  const renderPersonalDetailsStep = () => (
    <div className="space-y-6 bg-gradient-to-t from-gray-900  p-8 rounded-lg shadow-xl border border-gray-700">
      <h2 className="text-2xl text-gray-300 font-bold">Step 1: Personal Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3 text-gray-200">
          <Label className='text-xl pb-3 font-bold' htmlFor="firstName">First Name</Label>
          <Input 
            id="firstName"
            name="firstName"
            placeholder='First Name'
            className="bg-gray-800/60 border-gray-700 text-xl text-gray-100 focus:border-gray-950 focus:ring-slate-500 h-14 "
            value={formData.firstName} 
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-3 text-gray-200">
          <Label className='text-xl font-bold' htmlFor="lastName">Last Name</Label>
          <Input 
            id="lastName"
            name="lastName"
            placeholder='Last Name'
            className="bg-gray-800/60 border-gray-700 text-xl text-gray-100 focus:border-gray-950 focus:ring-gray-500 h-14 "
            value={formData.lastName} 
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="space-y-3 text-gray-200">
        <Label className='text-xl pb-3 font-bold' htmlFor="email">Email</Label>
        <Input 
          id="email" 
          name="email"
          type="email" 
          placeholder='Email'
          className="bg-gray-800/60 border-gray-700 text-xl text-gray-100 focus:border-gray-950 focus:ring-slate-500 h-14 "
          value={formData.email} 
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="space-y-3 pb-3 text-gray-200">
        <Label className='text-xl pb-3 mb-3 font-bold' htmlFor="phone">Phone Number</Label>
        <Input 
          id="phone" 
          name="phoneNumber"
          type="tel" 
          placeholder='Phone Number'
          className="bg-gray-800/60 border-gray-700 text-xl text-slate-100 focus:border-gray-950 focus:ring-slate-500 h-14 "
          value={formData.phoneNumber} 
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  );

  // Step 2: Event Selection
  const renderEventSelectionStep = () => (
    <div className="space-y-6 bg-gradient-to-t from-gray-900 p-8 rounded-lg shadow-xl border border-gray-700">
      <h2 className="text-2xl md:text-2xl text-gray-300 font-bold">Step 2: Event Selection</h2>
      <div className="space-y-3 text-gray-200">
        <Label className='text-xl font-bold' htmlFor="eventType">Event Type</Label>
        <Select
          value={formData.eventType}
          onValueChange={(value: string) => setFormData({...formData, eventType: value})}
        >
          <SelectTrigger id="eventType" className="bg-gray-800/60 border-gray-700 text-xl text-gray-100 h-10 md:h-14">
            <SelectValue placeholder="Select an event" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-xl text-gray-100 border-gray-700">
            <SelectItem value="CONFERENCE">Conference</SelectItem>
            <SelectItem value="WORKSHOP">Workshop</SelectItem>
            <SelectItem value="SEMINAR">Seminar</SelectItem>
            <SelectItem value="NETWORKING_EVENT">Networking Event</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-3 text-gray-200">
        <Label className='text-xl font-bold' htmlFor="eventDate">Event Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="eventDate" 
              variant="outline"
              className="w-full justify-start text-left font-normal bg-gray-800/60 border-gray-700 text-xl text-gray-100 h-10 md:h-14"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.date ? format(formData.date, "PPP") : <span className="text-gray-400">Select a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
            <Calendar
              mode="single"
              selected={formData.date}
              onSelect={(date) => setFormData({...formData, date})}
              initialFocus
              disabled={(date) => date < new Date() || date > new Date('2025-12-31')}
              className="bg-gray-800 text-gray-100"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );

  // Step 3: Preferences
  const renderPreferencesStep = () => (
    <div className="space-y-6 bg-gradient-to-t from-gray-900 p-8 rounded-lg shadow-xl border border-gray-700">
      <h2 className="text-xl md:text-2xl text-purple-300 font-bold">Step 3: Preferences</h2>
      <div className="space-y-3 text-gray-200">
        <Label className='text-xl md:text-xl font-bold' htmlFor="dietaryRequirements">Audience</Label>
        <RadioGroup 
          value={formData.dietaryRequirements}
          onValueChange={(value: string) => setFormData({...formData, dietaryRequirements: value})}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="0-50" id="none" className="border-gray-500 text-blue-500 h-3 w-3 md:h-6 md:w-6" />
            <Label htmlFor="none" className="text-xl text-gray-200">0-50</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="50-100" id="vegetarian" className="border-gray-500 text-blue-500 h-3 w-3 md:h-6 md:w-6" />
            <Label htmlFor="vegetarian" className="text-xl text-gray-200">50-100</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="100-150" id="vegan" className="border-gray-500 text-blue-500 h-3 w-3 md:h-6 md:w-6" />
            <Label htmlFor="vegan" className="text-xl text-gray-200">100-150</Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="200+" id="glutenFree" className="border-gray-500 text-blue-500 h-3 w-3 md:h-6 md:w-6" />
            <Label htmlFor="glutenFree" className="text-xl text-gray-200">200+</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex items-center space-x-3 py-2">
        <Checkbox 
          id="accommodationNeeded" 
          checked={formData.accommodationNeeded}
          onCheckedChange={(checked) => handleCheckboxChange('accommodationNeeded', checked)}
          className="border-gray-500 text-blue-500 data-[state=checked]:bg-blue-600 h-3 w-3 md:h-6 md:w-6"
        />
        <Label htmlFor="accommodationNeeded" className="text-xl md:text-xl text-gray-200">Will you provide accommodation</Label>
      </div>
      <div className="flex items-center space-x-3 py-2">
        <Checkbox 
          id="transportationNeeded" 
          checked={formData.transportationNeeded}
          onCheckedChange={(checked) => handleCheckboxChange('transportationNeeded', checked)}
          className="border-gray-500 text-blue-500 data-[state=checked]:bg-blue-600 h-3 w-3 md:h-6 md:w-6"
        />
        <Label htmlFor="transportationNeeded" className="text-xl md:text-xl text-gray-200">Will you provide transportation</Label>
      </div>
      <div className="space-y-3 text-gray-200">
        <Label className='text-xl font-bold' htmlFor="specialRequests">Special Requests :</Label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          className="w-full min-h-[120px] p-4 rounded-md bg-gradient-to-b from-gray-950 border border-gray-700 text-xl text-gray-100 focus:border-purple-500 focus:ring-purple-500"
          value={formData.specialRequests}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl h-90vh mx-auto p-8 bg-gradient-to-br from-gray-950  rounded-xl shadow-2xl border border-gray-700">

      <h1 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gray-100">Event Registration</h1> 

     <div className='text-center'>  {status && <p className="text-sm text-red-600 mt-2">{status}</p>} </div>
      {/* Progress indicator */}
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div 
            key={step} 
            className={`flex-1 border-b-2 pb-2 ${
              currentStep >= step ? 'border-blue-500' : 'border-gray-700'
            }`}
          >
            <span 
              className={`rounded-full h-7 w-7 inline-flex items-center justify-center mr-2 ${
                currentStep >= step ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' : 'bg-gray-700 text-gray-400'
              }`}
            >
              {step}
            </span>
            <span className={currentStep >= step ? 'text-purple-400' : 'text-gray-500'}>
              {step === 1 ? 'Personal Details' : step === 2 ? 'Event Selection' : 'Preferences'}
            </span>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit}>
        {currentStep === 1 && renderPersonalDetailsStep()}
        {currentStep === 2 && renderEventSelectionStep()}
        {currentStep === 3 && renderPreferencesStep()}
        
        <div className="mt-8 flex justify-between">
          {currentStep > 1 && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={prevStep}
              className="border-gray-600 text-gray-300 hover:bg-gray-950 hover:cursor-pointer hover:from-gray-800 hover:to-gray-900"
            >
              Back
            </Button>
          )}

          {/* Replaced nested ternary with clearer conditional rendering */}
          {currentStep === 1 && (
            <Button 
              type="button" 
              className="ml-auto bg-gradient-to-r from-black to-gray-900 hover:from-gray-950 hover:cursor-pointer text-white border-0"
              onClick={nextStep}
            >
              Continue
            </Button>
          )}
          {currentStep === 2 && (
            <Button 
              type="button" 
              className="ml-auto bg-gradient-to-r from-black to-gray-900 hover:from-gray-950  hover:cursor-pointer text-white border-0"
              onClick={nextStep}
            >
              Next Step
            </Button>
          )}
          {currentStep === 3 && (
            <Button 
              type="submit" 
              className="ml-auto bg-gradient-to-r from-black to-gray-900 hover:from-gray-950 hover:cursor-pointer text-white border-0"
            > 
              {status === 'Sending...' ? 'Sending...' : 'Submit Registration'}
            </Button>
          )}
        </div>
      </form>
    
    </div>
  );
}