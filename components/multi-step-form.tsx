"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check, ChevronRight, Heart } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "What's your name?",
    description: "Let us know who's celebrating with us!",
  },
  {
    id: 2,
    title: "Pick your favorite birthday treat!",
    description: "Everyone has a favorite birthday indulgence!",
  },
  {
    id: 3,
    title: "Choose your birthday vibe!",
    description: "How do you like to celebrate?",
  },
  {
    id: 4,
    title: "Share a birthday wish!",
    description: "What's your wish for the coming year?",
  },
]

export default function MultiStepForm({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    treat: "",
    vibe: "",
    wish: "",
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== ""
      case 2:
        return formData.treat !== ""
      case 3:
        return formData.vibe !== ""
      case 4:
        return formData.wish.trim() !== ""
      default:
        return false
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-200 rounded-full opacity-50" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-200 rounded-full opacity-50" />

      {/* Progress indicator */}
      <div className="flex mb-8 relative z-10">
        {steps.map((step) => (
          <div key={step.id} className="flex-1 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                step.id < currentStep
                  ? "bg-green-500 text-white"
                  : step.id === currentStep
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.id < currentStep ? <Check className="w-5 h-5" /> : <span>{step.id}</span>}
            </div>
            {step.id < steps.length && (
              <div className={`h-1 w-full ${step.id < currentStep ? "bg-green-500" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-purple-800 mb-2">{steps[currentStep - 1].title}</h2>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </div>

          {currentStep === 1 && (
            <div className="space-y-4">
              <Input
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                className="border-purple-300 focus:border-purple-500"
              />
            </div>
          )}

          {currentStep === 2 && (
            <RadioGroup
              value={formData.treat}
              onValueChange={(value) => updateFormData("treat", value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2 bg-pink-50 p-3 rounded-lg border border-pink-200 transition-all hover:bg-pink-100">
                <RadioGroupItem value="cake" id="cake" />
                <Label htmlFor="cake" className="flex-1 cursor-pointer">
                  Birthday Cake
                </Label>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg border border-blue-200 transition-all hover:bg-blue-100">
                <RadioGroupItem value="icecream" id="icecream" />
                <Label htmlFor="icecream" className="flex-1 cursor-pointer">
                  Ice Cream
                </Label>
              </div>
              <div className="flex items-center space-x-2 bg-amber-50 p-3 rounded-lg border border-amber-200 transition-all hover:bg-amber-100">
                <RadioGroupItem value="cookies" id="cookies" />
                <Label htmlFor="cookies" className="flex-1 cursor-pointer">
                  Cookies
                </Label>
              </div>
              <div className="flex items-center space-x-2 bg-red-50 p-3 rounded-lg border border-red-200 transition-all hover:bg-red-100">
                <RadioGroupItem value="cupcakes" id="cupcakes" />
                <Label htmlFor="cupcakes" className="flex-1 cursor-pointer">
                  Cupcakes
                </Label>
              </div>
            </RadioGroup>
          )}

          {currentStep === 3 && (
            <RadioGroup
              value={formData.vibe}
              onValueChange={(value) => updateFormData("vibe", value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2 bg-purple-50 p-3 rounded-lg border border-purple-200 transition-all hover:bg-purple-100">
                <RadioGroupItem value="party" id="party" />
                <Label htmlFor="party" className="flex-1 cursor-pointer">
                  Big Party
                </Label>
              </div>
              <div className="flex items-center space-x-2 bg-green-50 p-3 rounded-lg border border-green-200 transition-all hover:bg-green-100">
                <RadioGroupItem value="dinner" id="dinner" />
                <Label htmlFor="dinner" className="flex-1 cursor-pointer">
                  Nice Dinner
                </Label>
              </div>
              <div className="flex items-center space-x-2 bg-yellow-50 p-3 rounded-lg border border-yellow-200 transition-all hover:bg-yellow-100">
                <RadioGroupItem value="adventure" id="adventure" />
                <Label htmlFor="adventure" className="flex-1 cursor-pointer">
                  Adventure or Trip
                </Label>
              </div>
              <div className="flex items-center space-x-2 bg-indigo-50 p-3 rounded-lg border border-indigo-200 transition-all hover:bg-indigo-100">
                <RadioGroupItem value="chill" id="chill" />
                <Label htmlFor="chill" className="flex-1 cursor-pointer">
                  Chill at Home
                </Label>
              </div>
            </RadioGroup>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <Textarea
                placeholder="Share your birthday wish..."
                value={formData.wish}
                onChange={(e) => updateFormData("wish", e.target.value)}
                className="min-h-[120px] border-purple-300 focus:border-purple-500"
              />
            </div>
          )}

          <div className="mt-8 flex justify-end">
            <Button onClick={handleNext} disabled={!isStepComplete()} className="bg-purple-600 hover:bg-purple-700">
              {currentStep < steps.length ? (
                <>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  See Your Surprise
                  <Heart className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
