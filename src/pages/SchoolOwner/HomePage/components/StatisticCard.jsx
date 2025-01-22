import React from 'react';
import { motion } from 'framer-motion';

const StatisticCard = ({ title, value, subtitle, icon: Icon }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
        >
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col items-center justify-center border border-gray-100 min-h-[200px]">
                {Icon && (
                    <div className="text-[#72b626] mb-6">
                        <Icon sx={{ fontSize: 40 }} />
                    </div>
                )}
                <h3 className="text-gray-600 text-lg font-medium mb-3 text-center">
                    {title}
                </h3>
                <p className="text-4xl font-bold text-[#72b626] mb-3">
                    {value}
                </p>
                {subtitle && (
                    <p className="text-sm text-gray-500 text-center">
                        {subtitle}
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default StatisticCard;
