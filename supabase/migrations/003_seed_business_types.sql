-- Seed: 50 business types across key categories
-- Run after 001_create_tables.sql

insert into business_types (name, slug, category, description, federal_regulated) values
-- Construction
('General Contractor', 'general-contractor', 'Construction', 'Oversees construction projects, hires subcontractors, and manages building works.', false),
('Electrician', 'electrician', 'Construction', 'Installs, maintains, and repairs electrical systems in residential and commercial buildings.', false),
('Plumber', 'plumber', 'Construction', 'Installs and repairs pipes, fixtures, and other plumbing systems.', false),
('HVAC Technician', 'hvac-technician', 'Construction', 'Installs and services heating, ventilation, air conditioning, and refrigeration systems.', false),
('Roofer', 'roofer', 'Construction', 'Installs, repairs, and replaces roofs on buildings.', false),
('Landscaper', 'landscaper', 'Construction', 'Designs, installs, and maintains outdoor spaces and gardens.', false),
('Home Inspector', 'home-inspector', 'Construction', 'Evaluates the condition of residential properties for buyers and sellers.', false),
('Pest Control Operator', 'pest-control', 'Construction', 'Applies pesticides and manages pest infestations in residential and commercial properties.', false),

-- Healthcare
('Registered Nurse', 'registered-nurse', 'Healthcare', 'Provides patient care, administers medications, and coordinates with healthcare teams.', false),
('Physical Therapist', 'physical-therapist', 'Healthcare', 'Helps patients recover from injuries and improve physical mobility.', false),
('Massage Therapist', 'massage-therapist', 'Healthcare', 'Provides therapeutic massage services for health and wellness.', false),
('Cosmetologist', 'cosmetologist', 'Healthcare', 'Provides hair, skin, and nail services in salons and spas.', false),
('Barber', 'barber', 'Healthcare', 'Cuts and styles hair, and may provide shaving services.', false),
('Esthetician', 'esthetician', 'Healthcare', 'Provides skincare treatments including facials, waxing, and other skin services.', false),
('Tattoo Artist', 'tattoo-artist', 'Healthcare', 'Applies permanent ink designs to the skin.', false),
('Childcare Provider', 'childcare-provider', 'Healthcare', 'Provides care and supervision for children in daycare or home settings.', false),

-- Legal & Financial
('Notary Public', 'notary-public', 'Legal & Financial', 'Witnesses and authenticates legal documents and signatures.', false),
('Insurance Agent', 'insurance-agent', 'Legal & Financial', 'Sells and services insurance policies for individuals and businesses.', false),
('Real Estate Agent', 'real-estate-agent', 'Legal & Financial', 'Facilitates the buying, selling, and renting of properties.', false),
('Mortgage Broker', 'mortgage-broker', 'Legal & Financial', 'Connects borrowers with lenders for home and commercial loans.', false),
('Tax Preparer', 'tax-preparer', 'Legal & Financial', 'Prepares and files tax returns for individuals and businesses.', false),
('Collection Agency', 'collection-agency', 'Legal & Financial', 'Recovers unpaid debts on behalf of creditors.', false),
('Process Server', 'process-server', 'Legal & Financial', 'Delivers legal documents to parties involved in court proceedings.', false),

-- Transportation
('Driving Instructor', 'driving-instructor', 'Transportation', 'Teaches individuals how to operate motor vehicles safely.', false),
('Moving Company', 'moving-company', 'Transportation', 'Transports household and commercial goods between locations.', false),
('Limousine Service', 'limousine-service', 'Transportation', 'Provides luxury vehicle transportation for hire.', false),
('Tow Truck Operator', 'tow-truck', 'Transportation', 'Tows and recovers disabled or illegally parked vehicles.', false),
('Freight Broker', 'freight-broker', 'Transportation', 'Arranges transportation of goods between shippers and carriers.', true),

-- Food & Hospitality
('Restaurant Owner', 'restaurant', 'Food & Hospitality', 'Operates a food service establishment serving meals to the public.', false),
('Food Truck Operator', 'food-truck', 'Food & Hospitality', 'Operates a mobile food service vehicle selling prepared food.', false),
('Catering Business', 'catering', 'Food & Hospitality', 'Provides food and beverage services for events and gatherings.', false),
('Alcohol Retailer', 'alcohol-retailer', 'Food & Hospitality', 'Sells alcoholic beverages for on or off-premise consumption.', false),
('Personal Chef', 'personal-chef', 'Food & Hospitality', 'Prepares meals for private clients in their homes or offices.', false),

-- Professional Services
('Private Investigator', 'private-investigator', 'Professional Services', 'Conducts investigations and surveillance for private clients.', false),
('Security Guard', 'security-guard', 'Professional Services', 'Provides security services and protection for people and property.', false),
('Personal Trainer', 'personal-trainer', 'Professional Services', 'Provides fitness instruction and training to individual clients.', false),
('Accountant (CPA)', 'cpa', 'Professional Services', 'Provides accounting, auditing, and financial advisory services.', false),
('Employment Agency', 'employment-agency', 'Professional Services', 'Matches job seekers with employers for temporary or permanent positions.', false),
('Locksmith', 'locksmith', 'Professional Services', 'Installs, repairs, and opens locks and security systems.', false),
('Auctioneer', 'auctioneer', 'Professional Services', 'Conducts auctions and facilitates the sale of goods to the highest bidder.', false),
('Event Planner', 'event-planner', 'Professional Services', 'Organizes and coordinates events including weddings, conferences, and parties.', false),

-- Technology & Creative
('Architect', 'architect', 'Technology & Creative', 'Designs buildings and oversees construction projects.', false),
('Engineer (PE)', 'professional-engineer', 'Technology & Creative', 'Provides professional engineering services and stamps technical drawings.', false),
('Surveyor', 'land-surveyor', 'Technology & Creative', 'Measures and maps land boundaries and features.', false),
('Interior Designer', 'interior-designer', 'Technology & Creative', 'Designs and decorates interior spaces for residential and commercial clients.', false),

-- Home Services
('Appliance Repair', 'appliance-repair', 'Home Services', 'Repairs and services household appliances.', false),
('Cleaning Service', 'cleaning-service', 'Home Services', 'Provides residential and commercial cleaning services.', false),
('Pool Service', 'pool-service', 'Home Services', 'Maintains, repairs, and installs swimming pools and spas.', false),
('Solar Installer', 'solar-installer', 'Home Services', 'Installs solar panel systems on residential and commercial properties.', false),
('Septic Service', 'septic-service', 'Home Services', 'Installs, maintains, and repairs septic systems.', false)

on conflict (slug) do nothing;
