/* eslint-disable no-unused-vars */
import React from 'react';
import { Gift, Crown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeInUp, FadeInDown, ScaleUp } from '../Utility/Animation'; 
import {Helmet} from 'react-helmet-async'

const RewardsPage = () => {
  const userPoints = 320;
  const rewards = [
    { id: 1, name: '₹100 Off Coupon', points: 200 },
    { id: 2, name: 'Free Dessert', points: 300 },
    { id: 3, name: '₹500 Gift Voucher', points: 500 },
  ];

  const tiers = [
    {
      name: 'Silver',
      min: 0,
      benefits: 'Earn 1x points per order',
      color: 'from-gray-200 to-gray-300',
    },
    {
      name: 'Gold',
      min: 300,
      benefits: 'Earn 1.5x points + Free delivery',
      color: 'from-yellow-300 to-yellow-400',
    },
    {
      name: 'Platinum',
      min: 600,
      benefits: 'Earn 2x points + VIP support',
      color: 'from-indigo-300 to-indigo-400',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Urban Eats | Rewards </title>
        <meta
          name="description"
          content="Join Urban Eats Rewards and earn points with every order. Redeem rewards for free meals, exclusive offers, and more delicious benefits."
        />
      </Helmet>
      <div className="px-6 md:px-12 lg:px-24 py-16 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <FadeInDown>
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-10 text-center text-white">
              <h1 className="text-4xl font-extrabold mb-3">
                Rewards & Loyalty
              </h1>
              <p className="text-indigo-100 mb-6">
                Collect points with every order and unlock exclusive benefits.
              </p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true }}
                className="mt-4 bg-white text-indigo-600 font-bold text-2xl px-8 py-5 rounded-xl inline-block shadow-lg"
              >
                ⭐ {userPoints} Points
              </motion.div>
            </div>
          </FadeInDown>

          {/* Rewards Tiers */}
          <FadeInUp>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <Crown className="w-7 h-7 text-yellow-500" />
                Membership Tiers
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {tiers.map((tier, i) => (
                  <ScaleUp
                    key={i}
                    className={`rounded-2xl shadow-md p-6 hover:shadow-xl transition bg-gradient-to-br ${tier.color}`}
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {tier.name}
                    </h3>
                    <p className="text-gray-700 mb-2">From {tier.min} points</p>
                    <p className="text-sm text-gray-800 font-medium">
                      {tier.benefits}
                    </p>
                  </ScaleUp>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* Redeem Rewards */}
          <FadeInUp>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <Gift className="w-7 h-7 text-pink-500" />
                Redeem Rewards
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {rewards.map((reward, i) => (
                  <ScaleUp
                    key={reward.id}
                    className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition"
                    style={{ transitionDelay: `${i * 0.15}s` }}
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {reward.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Requires {reward.points} points
                      </p>
                    </div>
                    <button
                      disabled={userPoints < reward.points}
                      className={`mt-6 w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold transition ${
                        userPoints >= reward.points
                          ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 shadow-lg'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Redeem <ArrowRight className="w-4 h-4" />
                    </button>
                  </ScaleUp>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* CTA */}
          <FadeInUp>
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-10 text-center shadow-lg">
              <h2 className="text-3xl font-bold mb-3">
                Keep Ordering & Keep Winning 🎉
              </h2>
              <p className="mb-6 text-purple-100">
                Earn points every time you shop. More points = more rewards!
              </p>
              <a
                href="/menu"
                className="px-8 py-3 bg-white text-purple-700 rounded-xl font-semibold shadow hover:bg-gray-100 transition"
              >
                Order Now
              </a>
            </div>
          </FadeInUp>
        </div>
      </div>
    </>
  );
};

export default RewardsPage;
