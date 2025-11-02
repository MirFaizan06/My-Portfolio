import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Check, Zap, Star, Crown, Sparkles, Globe } from 'lucide-react';
import { pricingAPI, servicesAPI } from '../utils/api';
import {
  SUPPORTED_CURRENCIES,
  fetchExchangeRates,
  convertPrice,
  formatPrice,
  getUserCurrency,
} from '../utils/currency';

// Helper function to get icon component based on plan name
const getIconForPlan = (planName) => {
  const name = planName?.toLowerCase() || '';
  if (name.includes('starter') || name.includes('basic')) return Zap;
  if (name.includes('professional') || name.includes('pro')) return Star;
  if (name.includes('enterprise') || name.includes('premium')) return Crown;
  return Star; // Default icon
};

const Pricing = () => {
  const { isDark } = useTheme();
  const [pricingData, setPricingData] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  // Initialize currency and fetch exchange rates
  useEffect(() => {
    const initCurrency = async () => {
      try {
        // Fetch exchange rates
        const rates = await fetchExchangeRates();
        setExchangeRates(rates);

        // Get user's currency based on location
        const userCurrency = await getUserCurrency();
        setSelectedCurrency(userCurrency);
      } catch (error) {
        console.error('Error initializing currency:', error);
      }
    };

    initCurrency();
  }, []);

  // Fetch pricing and services data from API
  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const response = await pricingAPI.getAll();
        const apiPricing = response.data || [];
        setPricingData(apiPricing);
      } catch (error) {
        console.error('Error fetching pricing:', error);
        setPricingData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
    fetchServices();
  }, []);

  // Fetch additional services
  const fetchServices = async () => {
    try {
      const response = await servicesAPI.getAll();
      setServicesData(response.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServicesData([]);
    }
  };

  // Convert prices to selected currency
  const getConvertedPrice = (priceUSD) => {
    const converted = convertPrice(priceUSD, selectedCurrency, exchangeRates);
    return formatPrice(converted, selectedCurrency);
  };

  const additionalServices = servicesData.map(service => ({
    service: service.service,
    price: getConvertedPrice(service.priceUSD) + (service.isStartingPrice ? '+' : '') + (service.isMonthly ? '/mo' : ''),
    turnaround: service.turnaround,
  }));

  return (
    <div
      className={`min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1
            className={`text-4xl sm:text-5xl font-bold mb-4 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Simple, <span className="gradient-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Transparent</span> Pricing
          </h1>
          <p
            className={`text-lg mb-6 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Choose the perfect plan for your project needs
          </p>

          {/* Currency Selector */}
          <div className="flex justify-center">
            <div className="relative inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  isDark
                    ? 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                    : 'bg-white text-gray-900 hover:bg-gray-50 border border-gray-300'
                } shadow-lg`}
              >
                <Globe size={20} />
                <span className="text-xl">{SUPPORTED_CURRENCIES[selectedCurrency]?.flag}</span>
                <span>{selectedCurrency} - {SUPPORTED_CURRENCIES[selectedCurrency]?.symbol}</span>
              </motion.button>

              {/* Currency Dropdown */}
              <AnimatePresence>
                {showCurrencyDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute top-full mt-2 left-0 right-0 rounded-xl overflow-hidden shadow-2xl z-50 ${
                      isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                    }`}
                  >
                    <div className="max-h-96 overflow-y-auto">
                      {Object.entries(SUPPORTED_CURRENCIES).map(([code, info]) => (
                        <motion.button
                          key={code}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => {
                            setSelectedCurrency(code);
                            setShowCurrencyDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                            selectedCurrency === code
                              ? isDark
                                ? 'bg-gradient-to-r from-cyan-900/50 to-purple-900/50'
                                : 'bg-gradient-to-r from-blue-50 to-indigo-50'
                              : isDark
                              ? 'hover:bg-gray-700'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-2xl">{info.flag}</span>
                          <div className="flex-1">
                            <div
                              className={`font-medium ${
                                isDark ? 'text-white' : 'text-gray-900'
                              }`}
                            >
                              {code} - {info.symbol}
                            </div>
                            <div
                              className={`text-sm ${
                                isDark ? 'text-gray-400' : 'text-gray-600'
                              }`}
                            >
                              {info.name}
                            </div>
                          </div>
                          {selectedCurrency === code && (
                            <Check className="text-green-500" size={20} />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`h-[600px] rounded-2xl animate-pulse ${
                  isDark ? 'bg-gray-800' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        ) : pricingData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center py-20 px-6 rounded-2xl ${
              isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'
            }`}
          >
            <Sparkles size={64} className={`mx-auto mb-6 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
            <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No Pricing Plans Available Yet
            </h3>
            <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Check back soon! Pricing plans will be available shortly.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {pricingData.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-2xl overflow-hidden ${
                  plan.popular ? 'md:-mt-4 md:mb-4' : ''
                } ${
                  isDark
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200'
                } transition-all duration-300`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div
                    className={`absolute top-0 right-0 px-4 py-1 bg-gradient-to-r ${plan.color} text-white text-sm font-semibold rounded-bl-lg`}
                  >
                    <Sparkles className="inline mr-1" size={14} />
                    Most Popular
                  </div>
                )}

                <div className="p-8">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${plan.color || 'from-blue-500 to-cyan-500'} mb-4`}
                  >
                    {(() => {
                      const IconComponent = plan.icon || getIconForPlan(plan.name);
                      return <IconComponent className="text-white" size={32} />;
                    })()}
                  </div>

                  {/* Plan Name */}
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {plan.name}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-sm mb-6 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <span
                      className={`text-5xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {getConvertedPrice(parseFloat(plan.price))}
                    </span>
                    <span
                      className={`text-lg ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      /{plan.period}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <motion.a
                    href="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`block w-full py-3 px-6 rounded-lg font-semibold text-center mb-6 transition-all ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.color} text-white hover:shadow-lg`
                        : isDark
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                    }`}
                  >
                    Get Started
                  </motion.a>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Check
                          className={`flex-shrink-0 mt-0.5 ${
                            plan.popular
                              ? 'text-purple-500'
                              : isDark
                              ? 'text-cyan-400'
                              : 'text-blue-600'
                          }`}
                          size={20}
                        />
                        <span
                          className={`text-sm ${
                            isDark ? 'text-gray-300' : 'text-gray-700'
                          }`}
                        >
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Additional Services Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2
            className={`text-3xl font-bold text-center mb-8 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Additional Services
          </h2>

          <div className="overflow-x-auto">
            <div
              className={`rounded-2xl overflow-hidden ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-xl`}
            >
              <table className="w-full">
                <thead>
                  <tr
                    className={`${
                      isDark
                        ? 'bg-gradient-to-r from-cyan-900/30 to-purple-900/30'
                        : 'bg-gradient-to-r from-blue-50 to-indigo-50'
                    }`}
                  >
                    <th
                      className={`px-6 py-4 text-left text-sm font-bold uppercase tracking-wider ${
                        isDark ? 'text-cyan-400' : 'text-blue-900'
                      }`}
                    >
                      Service
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-sm font-bold uppercase tracking-wider ${
                        isDark ? 'text-cyan-400' : 'text-blue-900'
                      }`}
                    >
                      Starting Price
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-sm font-bold uppercase tracking-wider ${
                        isDark ? 'text-cyan-400' : 'text-blue-900'
                      }`}
                    >
                      Turnaround Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {additionalServices.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-12 text-center">
                        <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          No additional services available yet
                        </p>
                      </td>
                    </tr>
                  ) : (
                    additionalServices.map((service, index) => (
                    <motion.tr
                      key={service.service}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className={`${
                        isDark
                          ? 'hover:bg-gray-700/50'
                          : 'hover:bg-gray-50'
                      } transition-colors`}
                    >
                      <td
                        className={`px-6 py-4 whitespace-nowrap font-medium ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {service.service}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap font-semibold ${
                          isDark ? 'text-cyan-400' : 'text-blue-600'
                        }`}
                      >
                        {service.price}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap ${
                          isDark ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {service.turnaround}
                      </td>
                    </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`mt-12 p-6 rounded-xl text-center ${
            isDark ? 'bg-gray-800' : 'bg-blue-50'
          }`}
        >
          <p
            className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-700'
            }`}
          >
            💡 <strong>Note:</strong> All prices are negotiable based on project complexity and requirements.
            Contact me for a custom quote tailored to your specific needs.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
