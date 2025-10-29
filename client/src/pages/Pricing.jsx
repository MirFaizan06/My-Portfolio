import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Check, Zap, Star, Crown, Sparkles } from 'lucide-react';

const Pricing = () => {
  const { isDark } = useTheme();
  const [pricingData, setPricingData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample pricing data (replace with API call later)
  useEffect(() => {
    setTimeout(() => {
      setPricingData([
        {
          id: 1,
          name: 'Starter',
          icon: Zap,
          price: '499',
          period: 'project',
          description: 'Perfect for small projects and MVPs',
          color: 'from-blue-500 to-cyan-500',
          features: [
            'Single Page Application',
            'Responsive Design',
            'Basic SEO Setup',
            'Contact Form Integration',
            '2 Revisions Included',
            '7 Days Delivery',
            'Basic Documentation',
          ],
          popular: false,
        },
        {
          id: 2,
          name: 'Professional',
          icon: Star,
          price: '999',
          period: 'project',
          description: 'Ideal for business websites and web apps',
          color: 'from-purple-500 to-pink-500',
          features: [
            'Multi-Page Application',
            'Custom Design & Animation',
            'Advanced SEO & Analytics',
            'CMS Integration',
            'API Development',
            '5 Revisions Included',
            '14 Days Delivery',
            'Admin Dashboard',
            'Email Support',
            'Deployment Assistance',
          ],
          popular: true,
        },
        {
          id: 3,
          name: 'Enterprise',
          icon: Crown,
          price: '2499',
          period: 'project',
          description: 'For complex applications and full solutions',
          color: 'from-orange-500 to-red-500',
          features: [
            'Full-Stack Application',
            'Custom Architecture',
            'Complete SEO & Marketing Setup',
            'Advanced Backend & Database',
            'Third-party Integrations',
            'Unlimited Revisions',
            '30 Days Delivery',
            'Advanced Admin Panel',
            'User Authentication & Authorization',
            'Real-time Features',
            'Priority Support',
            '3 Months Free Maintenance',
          ],
          popular: false,
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Additional services
  const additionalServices = [
    { service: 'Mobile App Development', price: '$1,500+', turnaround: '3-4 weeks' },
    { service: 'UI/UX Design', price: '$300', turnaround: '3-5 days' },
    { service: 'API Development', price: '$500', turnaround: '1 week' },
    { service: 'Database Design & Setup', price: '$400', turnaround: '3-5 days' },
    { service: 'E-commerce Integration', price: '$800', turnaround: '1-2 weeks' },
    { service: 'Performance Optimization', price: '$350', turnaround: '2-3 days' },
    { service: 'SEO & Analytics Setup', price: '$250', turnaround: '2-3 days' },
    { service: 'Monthly Maintenance', price: '$200/mo', turnaround: 'Ongoing' },
  ];

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
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h1>
          <p
            className={`text-lg ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Choose the perfect plan for your project needs
          </p>
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
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${plan.color} mb-4`}
                  >
                    <plan.icon className="text-white" size={32} />
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
                      ${plan.price}
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
                  {additionalServices.map((service, index) => (
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
                  ))}
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
