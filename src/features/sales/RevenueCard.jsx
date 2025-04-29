import React from 'react';
import { useSelector } from 'react-redux';
import { selectTotalRevenue } from './salesSelector';

const RevenueCard = () => {
  const totalRevenue = useSelector(selectTotalRevenue);

  return (
    <div className="bg-green-100 text-green-800 rounded p-6 shadow mb-6 flex justify-between items-center">
      <h2 className="text-xl font-bold">💰 Total Revenue</h2>
      <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
    </div>
  );
};

export default RevenueCard;
