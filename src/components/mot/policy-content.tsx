interface PolicyContentProps {
  description: string;
}

export function PolicyContent({ description }: PolicyContentProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-8">
        <div className="prose max-w-none">
          <h3 className="text-xl font-semibold mb-4">1. Introduction</h3>
          <p className="mb-6 text-gray-700 leading-relaxed">
            This policy document outlines the operational guidelines for all
            public bus services operating within the transportation network. The
            guidelines ensure safety, efficiency, and quality service delivery
            to passengers while maintaining operational standards.
          </p>
          <p className="mb-6 text-gray-700 leading-relaxed">{description}</p>

          <h3 className="text-xl font-semibold mb-4">
            2. Scope and Application
          </h3>
          <p className="mb-6 text-gray-700 leading-relaxed">
            These guidelines apply to all operators, drivers, and support staff
            involved in public bus transportation services. Compliance with
            these guidelines is mandatory for all service providers.
          </p>

          <h3 className="text-xl font-semibold mb-4">
            3. Operational Standards
          </h3>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Punctuality and schedule adherence requirements</li>
            <li>Vehicle maintenance and safety inspection protocols</li>
            <li>Driver qualification and training standards</li>
            <li>Passenger safety and comfort measures</li>
            <li>Emergency response procedures</li>
          </ul>

          <h3 className="text-xl font-semibold mb-4">4. Safety Requirements</h3>
          <p className="mb-6 text-gray-700 leading-relaxed">
            All vehicles must undergo regular safety inspections and maintain
            current certifications. Drivers must complete mandatory safety
            training and hold valid commercial driving licenses.
          </p>

          <h3 className="text-xl font-semibold mb-4">
            5. Compliance and Monitoring
          </h3>
          <p className="mb-6 text-gray-700 leading-relaxed">
            Regular audits and performance monitoring will be conducted to
            ensure compliance with these guidelines. Non-compliance may result
            in penalties or service suspension.
          </p>

          <h3 className="text-xl font-semibold mb-4">6. Effective Date</h3>
          <p className="text-gray-700 leading-relaxed">
            This policy comes into effect immediately upon publication and
            supersedes all previous versions of similar guidelines.
          </p>
        </div>
      </div>
    </div>
  );
}
