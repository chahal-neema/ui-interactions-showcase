import React, { useState } from 'react';
import { InteractionCard } from '../InteractionCard';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export function FormInteractions() {
  const [focused, setFocused] = useState('');
  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InteractionCard
        title="Floating Label"
        description="Label that moves up when the input is focused or has content">
        <div className="relative">
          <input
            type="text"
            id="floating-input"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            onFocus={() => setFocused('floating')}
            onBlur={() => setFocused('')}
          />
          <label
            htmlFor="floating-input"
            className={`absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
              focused === 'floating' ? 'text-blue-600' : ''
            }`}
          >
            Floating label
          </label>
        </div>
      </InteractionCard>

      <InteractionCard
        title="Input Validation"
        description="Real-time validation feedback as the user types">
        <div className="space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${
              value.length > 0
                ? value.length < 3
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:ring-blue-200'
            } focus:outline-none focus:ring-2`}
            placeholder="Type at least 3 characters"
          />
          {value.length > 0 && value.length < 3 && (
            <p className="text-red-500 text-sm">Input must be at least 3 characters</p>
          )}
        </div>
      </InteractionCard>

      <InteractionCard
        title="Password Strength"
        description="Visual indicator of password strength">
        <div className="space-y-2">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-3 py-2 border rounded-md pr-10"
              placeholder="Enter password"
              onChange={(e) => {
                const strength = e.target.value.length;
                const meter = document.getElementById('password-strength');
                if (meter) {
                  meter.value = Math.min(strength * 10, 100);
                }
              }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <meter
            id="password-strength"
            className="w-full h-2"
            min="0"
            max="100"
            low="33"
            high="66"
            optimum="100"
            value="0"
          />
        </div>
      </InteractionCard>

      <InteractionCard
        title="Live Email Validation"
        description="Real-time email validation with visual feedback">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 pr-10 border rounded-md ${
              email
                ? isValidEmail(email)
                  ? 'border-green-500'
                  : 'border-red-500'
                : 'border-gray-300'
            }`}
            placeholder="Enter email"
          />
          {email && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              {isValidEmail(email) ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <X className="w-5 h-5 text-red-500" />
              )}
            </div>
          )}
        </div>
      </InteractionCard>

      <InteractionCard
        title="Typing Indicator"
        description="Shows when user is actively typing">
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Start typing..."
              onChange={() => {
                setIsTyping(true);
                setTimeout(() => setIsTyping(false), 1000);
              }}
            />
            {isTyping && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>
        </div>
      </InteractionCard>

      <InteractionCard
        title="Tag Input"
        description="Add and remove tags with keyboard interaction">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2 p-2 border rounded-md">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {tag}
                <button
                  onClick={() => removeTag(index)}
                  className="hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInput}
              className="flex-1 min-w-[120px] outline-none"
              placeholder="Type and press Enter"
            />
          </div>
        </div>
      </InteractionCard>
    </div>
  );
}