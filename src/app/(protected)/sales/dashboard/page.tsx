import React from 'react';
import { Users, BarChart2, DollarSign, Target, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function SalesDashboardPage() {
return (
    <div className="space-y-8 p-6">
    <h1 className="text-4xl font-bold text-gray-900">Sales Dashboard</h1>

    {/* Stats Cards */}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Assigned Customers */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Assigned Customers</h3>
            <Users className="h-4 w-4 text-gray-400" />
        </div>
        <div className="mt-2">
            <p className="text-2xl font-bold">75</p>
            <p className="text-xs text-gray-500 mt-1">+3 new assignments this month</p>
        </div>
        </div>

        {/* Monthly Sales Target */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Monthly Sales Target</h3>
            <Target className="h-4 w-4 text-gray-400" />
        </div>
        <div className="mt-2">
            <p className="text-2xl font-bold">$15,000 / $20,000</p>
            <p className="text-xs text-gray-500 mt-1">75% achieved</p>
        </div>
        </div>

        {/* Pending Leads */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Pending Leads</h3>
            <PlusCircle className="h-4 w-4 text-gray-400" />
        </div>
        <div className="mt-2">
            <p className="text-2xl font-bold">8</p>
            <p className="text-xs text-gray-500 mt-1">Follow up required</p>
        </div>
        </div>

        {/* Recent Orders Placed */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Recent Orders Placed</h3>
            <DollarSign className="h-4 w-4 text-gray-400" />
        </div>
        <div className="mt-2">
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
        </div>
        </div>
    </div>

    {/* Quick Actions */}
    <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Manage Customers */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">Manage Customers</h3>
            </div>
            <div>
            <p className="text-gray-500 mb-4">View and interact with your assigned customer accounts.</p>
            <Link href="/sales/customers">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Go to My Customers
                </button>
            </Link>
            </div>
        </div>

        {/* Submit New Lead/Order */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">Submit New Lead/Order</h3>
            </div>
            <div>
            <p className="text-gray-500 mb-4">Create new sales leads or submit orders on behalf of customers.</p>
            <Link href="/sales/leads">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Submit Lead/Order
                </button>
            </Link>
            </div>
        </div>

        {/* View Sales Reports */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">View Sales Reports</h3>
            </div>
            <div>
            <p className="text-gray-500 mb-4">Access detailed reports on your sales performance.</p>
            <Link href="/sales/reports">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                View Reports
                </button>
            </Link>
            </div>
        </div>
        </div>
    </section>

    {/* Divider */}
    <div className="border-t border-gray-200 my-6"></div>

    {/* Recent Activity & Reminders */}
    <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Recent Activity & Reminders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Customer Interactions */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">Recent Customer Interactions</h3>
            <p className="text-gray-500">Latest updates on your customer engagements.</p>
            </div>
            <div>
            <ul className="space-y-2 text-sm text-gray-500">
                <li><strong>John Doe</strong>: Follow-up email sent regarding product inquiry. (Yesterday)</li>
                <li><strong>Jane Smith</strong>: Phone call about order #10234. (2 days ago)</li>
                <li><strong>Acme Corp</strong>: New lead assigned for enterprise solution. (3 days ago)</li>
            </ul>
            <Link href="/sales/customers">
                <button className="mt-4 text-blue-600 hover:text-blue-800 hover:underline">
                View All Interactions
                </button>
            </Link>
            </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Tasks</h3>
            <p className="text-gray-500">Important tasks and follow-ups due soon.</p>
            </div>
            <div>
            <ul className="space-y-2 text-sm text-gray-500">
                <li>Call <strong>Client XYZ</strong> - Product demo follow-up. (Due: Jul 25)</li>
                <li>Prepare <strong>Quarterly Sales Report</strong>. (Due: Jul 30)</li>
                <li>Review <strong>Pending Leads</strong>. (Ongoing)</li>
            </ul>
            <button className="mt-4 text-blue-600 hover:text-blue-800 hover:underline">
                Add New Task
            </button>
            </div>
        </div>
        </div>
    </section>
    </div>
);
}