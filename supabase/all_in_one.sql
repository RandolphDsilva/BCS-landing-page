-- Bombay Catholic Sabha -- Sponsors schema
-- Paste this whole file into the Supabase SQL Editor and click Run.
-- Idempotent: safe to re-run.

create extension if not exists "pgcrypto";

create table if not exists public.sponsors (
  id              uuid primary key default gen_random_uuid(),
  display_name    text not null,
  slug            text unique,
  tag             text,
  type            text,
  contact_person  text,
  business_name   text,
  phone_1         text,
  phone_2         text,
  email           text,
  website         text,
  address         text,
  short_details   text,
  notes           text,
  pdf_page        integer,
  pdf_url         text,
  logo_url        text,
  is_featured     boolean not null default false,
  sort_order      integer not null default 1000,
  status          text not null default 'publish',
  created_at      timestamptz not null default now()
);

create index if not exists sponsors_status_featured_idx
  on public.sponsors (status, is_featured, sort_order);

create index if not exists sponsors_tag_idx on public.sponsors (tag);
create index if not exists sponsors_type_idx on public.sponsors (type);

alter table public.sponsors enable row level security;

drop policy if exists "sponsors_public_read" on public.sponsors;
create policy "sponsors_public_read"
  on public.sponsors
  for select
  to anon, authenticated
  using (status = 'publish');
-- Seed data for sponsors.sponsors
-- Hand-curated featured sponsors (shown on the landing page) + full OCR directory below.
-- Safe to re-run: wipes and re-inserts.

DELETE FROM public.sponsors;

-- ============================================================
-- 1) HAND-CURATED FEATURED SPONSORS (is_featured = TRUE)
--    These represent real supporters from the Sabha Day 2026
--    souvenir, cleaned from the OCR source for display quality.
-- ============================================================
INSERT INTO public.sponsors
  (display_name, slug, tag, type, contact_person, business_name,
   phone_1, phone_2, email, website, address, short_details,
   pdf_page, is_featured, sort_order, status)
VALUES
  (
    'Ryan Group of Schools', 'ryan-group-of-schools',
    'Best Compliments', 'Education',
    NULL, 'Ryan International Group',
    NULL, NULL, NULL, 'www.ryangroup.org', NULL,
    '47 years of education excellence. "The Lord has done this, and it is marvellous in our eyes." -- Psalm 118:23',
    6, TRUE, 10, 'publish'
  ),
  (
    'St. Xavier''s High School & Jr. College', 'st-xaviers-high-school',
    'Best Compliments', 'Education',
    NULL, 'St. Xavier''s -- Science & Commerce',
    NULL, NULL, NULL, NULL, NULL,
    'With best compliments from St. Xavier''s High School & Jr. College of Science and Commerce.',
    8, TRUE, 20, 'publish'
  ),
  (
    'HDFC Bank -- NRI Banking', 'hdfc-bank-nri-banking',
    'Best Compliments', 'Finance/Retail',
    NULL, 'HDFC Bank Ltd.',
    NULL, NULL, NULL, 'www.hdfcbank.com', NULL,
    'With best compliments from HDFC Bank -- dedicated NRI banking services for the Catholic community in Mumbai and abroad.',
    31, TRUE, 30, 'publish'
  ),
  (
    'Model Co-operative Bank Ltd.', 'model-co-operative-bank',
    'Best Compliments', 'Finance/Retail',
    NULL, 'Model Co-operative Bank',
    NULL, NULL, NULL, 'www.modelbank.bank.in', NULL,
    'A multi-state scheduled co-operative bank serving the community since 1953.',
    42, TRUE, 40, 'publish'
  ),
  (
    'Our Lady of Immaculate Conception Church', 'our-lady-immaculate-conception',
    'Best Compliments', 'Religious/Parish',
    NULL, 'Parish of the Immaculate Conception',
    NULL, NULL, NULL, NULL, 'Mount Poinsur, Borivali (West), Mumbai',
    'With best compliments from the priests and parishioners of Our Lady of Immaculate Conception, Mount Poinsur.',
    11, TRUE, 50, 'publish'
  ),
  (
    'The Salesians of Don Bosco', 'salesians-don-bosco',
    'Best Compliments', 'Religious/Parish',
    NULL, 'Shrine of Don Bosco''s Madonna',
    '02224146320', NULL, 'dbmshrine@gmail.com', 'www.dbmshrine.org',
    'Shrine of Don Bosco''s Madonna, Matunga, Mumbai 400 019 -- India.',
    'Shrine of Don Bosco''s Madonna, Matunga. A Salesian centre of faith, youth work and community service in Mumbai.',
    68, TRUE, 60, 'publish'
  ),
  (
    'Krupa Constructions', 'krupa-constructions',
    'Best Compliments', 'Real Estate/Construction',
    'Vincent Goveas', 'Krupa Constructions',
    '9987034302', NULL, 'krupac93@gmail.com', NULL, NULL,
    'Civil contractors for commercial and residential projects -- building repair, civil structural repair and project management.',
    15, TRUE, 70, 'publish'
  ),
  (
    'Thunga Hospitals', 'thunga-hospitals',
    'Best Compliments', 'Healthcare',
    NULL, 'Thunga Hospitals',
    NULL, NULL, NULL, 'www.thungahospital.com', NULL,
    'A multi-speciality healthcare group serving families across Mumbai with compassionate, quality care.',
    55, TRUE, 80, 'publish'
  );

-- ============================================================
-- 2) REGULAR DIRECTORY ENTRIES (is_featured = FALSE)
--    Cleaner subset drawn from the souvenir -- visible on the
--    /sponsors page but not on the landing featured grid.
-- ============================================================
INSERT INTO public.sponsors
  (display_name, slug, tag, type, contact_person, business_name,
   phone_1, phone_2, email, website, short_details,
   pdf_page, is_featured, sort_order, status)
VALUES
  ('Prakash Jewellers', 'prakash-jewellers', 'Best Compliments', 'Finance/Retail',
   NULL, 'Prakash Jewellers', NULL, NULL, NULL, NULL,
   'A family jeweller trusted for generations.', 44, FALSE, 1001, 'publish'),

  ('Evergrowth Investments', 'evergrowth-investments', 'Best Compliments', 'Finance/Retail',
   NULL, 'Evergrowth Investments', '9833550308', NULL, NULL, NULL,
   'Financial planning and wealth advisory services.', 45, FALSE, 1002, 'publish'),

  ('Wealth Gain Financial Services', 'wealth-gain-financial', 'Best Compliments', 'Finance/Retail',
   NULL, 'Wealth Gain Financial Services', '9987030525', NULL, NULL, NULL,
   'Financial advisory for families and small businesses.', 46, FALSE, 1003, 'publish'),

  ('Serrao Financial Services', 'serrao-financial', 'Best Compliments', 'Finance/Retail',
   NULL, 'Serrao Financial Services', '9820410880', NULL, NULL, NULL,
   'Independent financial services and investment planning.', 47, FALSE, 1004, 'publish'),

  ('Joel Investment', 'joel-investment', 'Best Compliments', 'Finance/Retail',
   NULL, 'Joel Investment', '9821666641', NULL, NULL, NULL,
   'Investments and insurance advisory.', 48, FALSE, 1005, 'publish'),

  ('Citizencredit Co-operative Bank', 'citizencredit-bank', 'Commercial Ad', 'Finance/Retail',
   NULL, 'Citizencredit Co-operative Bank Ltd.', NULL, NULL, NULL, 'www.citizencreditbank.com',
   'A community-rooted co-operative bank serving Mumbai for over 100 years.', 50, FALSE, 1006, 'publish'),

  ('Sahu Eye Hospital LLP', 'sahu-eye-hospital', 'Best Compliments', 'Healthcare',
   NULL, 'Sahu Eye Hospital LLP', '9326144874', NULL, NULL, NULL,
   'Specialist eye care and ophthalmic surgery.', 56, FALSE, 1007, 'publish'),

  ('Life Care Bio-Medical Pvt. Ltd.', 'life-care-bio-medical', 'Best Compliments', 'Healthcare',
   NULL, 'Life Care Bio-Medical Pvt. Ltd.', '9321144502', NULL, NULL, NULL,
   'Bio-medical equipment, supplies and service partners.', 57, FALSE, 1008, 'publish'),

  ('See Clear Opticals', 'see-clear-opticals', 'Commercial Ad', 'Healthcare',
   NULL, 'See Clear Opticals', NULL, NULL, NULL, NULL,
   'Opticians and eyewear specialists.', 58, FALSE, 1009, 'publish'),

  ('Velankanni Caterers', 'velankanni-caterers', 'Best Compliments', 'Hospitality/Food',
   'Valerian D''Souza', 'Velankanni Caterers -- Vakola',
   NULL, NULL, NULL, NULL,
   'Catering for weddings, communions, jubilees and parish celebrations.', 60, FALSE, 1010, 'publish'),

  ('V3 Vienna Bakery', 'v3-vienna-bakery', 'Best Compliments', 'Hospitality/Food',
   NULL, 'V3 Vienna Bakery', '8369459055', NULL, NULL, NULL,
   'Classic breads, cakes and pastries, baked fresh daily.', 61, FALSE, 1011, 'publish'),

  ('Johnmeal Catering Co.', 'johnmeal-catering', 'Best Compliments', 'Hospitality/Food',
   NULL, 'Johnmeal Catering Co.', '8452086632', NULL, NULL, NULL,
   'Full-service catering for community functions and celebrations.', 62, FALSE, 1012, 'publish'),

  ('OM Clearing & Forwarding Pvt. Ltd.', 'om-clearing-forwarding', 'Best Compliments', 'Logistics',
   'Namdeo Gate', 'OM Clearing & Forwarding', '9820915865', NULL, NULL, 'www.omservices.in',
   'Customs clearing, international freight and logistics services.', 19, FALSE, 1013, 'publish'),

  ('Masters Sea-Air Logistics', 'masters-sea-air-logistics', 'Best Compliments', 'Logistics',
   NULL, 'Masters Sea-Air Logistics', NULL, NULL, NULL, 'www.masterslogistics.in',
   'End-to-end sea and air freight logistics.', 64, FALSE, 1014, 'publish'),

  ('Jaguar Shipping Logistics Pvt. Ltd.', 'jaguar-shipping-logistics', 'Best Compliments', 'Logistics',
   NULL, 'Jaguar Shipping Logistics', NULL, NULL, NULL, 'www.jaguarship.com',
   'International shipping and logistics partners.', 65, FALSE, 1015, 'publish'),

  ('Suraj Cargo Movers', 'suraj-cargo-movers', 'Best Compliments', 'Logistics',
   'Naresh Mahla', 'Suraj Cargo Movers', NULL, NULL, 'surajcargo@gmail.com', NULL,
   'Reliable domestic packers and movers.', 66, FALSE, 1016, 'publish'),

  ('Cargoone Oceanair Logistics Pvt. Ltd.', 'cargoone-oceanair', 'Commercial Ad', 'Logistics',
   NULL, 'Cargoone Oceanair Logistics', NULL, NULL, 'suraj@cargoonelogistics.com', NULL,
   'Ocean and air logistics -- worldwide reach.', 67, FALSE, 1017, 'publish'),

  ('Transcon Freight System Pvt. Ltd.', 'transcon-freight', 'Best Compliments', 'Logistics',
   NULL, 'Transcon Freight System', NULL, NULL, NULL, 'www.transconfreight.com',
   'International freight forwarding and customs brokerage.', 69, FALSE, 1018, 'publish'),

  ('Gabrial Electrical Pvt. Ltd.', 'gabrial-electrical', 'Best Compliments', 'Industrial/Manufacturing',
   NULL, 'Gabrial Electrical Pvt. Ltd.', NULL, NULL, NULL, NULL,
   'Electrical engineering, panels and industrial automation.', 30, FALSE, 1019, 'publish'),

  ('Grameen Pharma LLP', 'grameen-pharma', 'Best Compliments', 'Industrial/Manufacturing',
   NULL, 'Grameen Pharma LLP', '02235643056', NULL, 'grameendahanu@gmail.com', NULL,
   'Pharmaceutical formulations and distribution.', 72, FALSE, 1020, 'publish'),

  ('Cospower Engineering Ltd.', 'cospower-engineering', 'Best Compliments', 'Industrial/Manufacturing',
   NULL, 'Cospower Engineering Ltd.', NULL, NULL, 'contact@cel.net.in', 'www.cel.net.in',
   'Power engineering solutions for industry.', 73, FALSE, 1021, 'publish'),

  ('Raltech Precision Engineering Pvt. Ltd.', 'raltech-precision', 'Best Compliments', 'Industrial/Manufacturing',
   NULL, 'Raltech Precision Engineering', NULL, NULL, NULL, 'www.raltech.in',
   'Precision engineering and contract manufacturing.', 74, FALSE, 1022, 'publish'),

  ('Valencia Polymers', 'valencia-polymers', 'Best Compliments', 'Industrial/Manufacturing',
   NULL, 'Valencia Polymers', NULL, NULL, NULL, 'www.valenciapolymers.com',
   'Polymer and plastics manufacturing.', 75, FALSE, 1023, 'publish'),

  ('Vel-Vin Sustainable Packaging', 'vel-vin-packaging', 'Best Compliments', 'Industrial/Manufacturing',
   NULL, 'Vel-Vin Manufacturing', NULL, NULL, NULL, 'www.vel-vin.com',
   'Sustainable packaging solutions, exported worldwide.', 76, FALSE, 1024, 'publish'),

  ('Zen Pharma Pvt. Ltd.', 'zen-pharma', 'Best Compliments', 'Industrial/Manufacturing',
   NULL, 'Zen Pharma Pvt. Ltd.', NULL, NULL, NULL, NULL,
   'Pharmaceutical manufacturing and R&D.', 77, FALSE, 1025, 'publish'),

  ('Genex Pharma', 'genex-pharma', 'Best Compliments', 'Industrial/Manufacturing',
   NULL, 'Genex Pharma', NULL, NULL, NULL, 'www.genexpharma.co.in',
   'Pharmaceutical products and formulations.', 78, FALSE, 1026, 'publish'),

  ('Our Lady of the Rosary Church', 'our-lady-rosary-goregaon', 'Best Compliments', 'Religious/Parish',
   NULL, 'Parish of the Holy Rosary', NULL, NULL, NULL, NULL,
   'With best compliments from the parishioners of Our Lady of the Rosary, Goregaon West.',
   13, FALSE, 1027, 'publish'),

  ('St. Joseph''s Church, Gokuldham', 'st-joseph-gokuldham', 'Best Compliments', 'Religious/Parish',
   NULL, 'St. Joseph''s Parish', NULL, NULL, NULL, NULL,
   'Priests and parishioners of St. Joseph''s Church, Gokuldham, Goregaon (East).',
   25, FALSE, 1028, 'publish'),

  ('St. Thomas Church, Goregaon East', 'st-thomas-goregaon', 'Best Compliments', 'Religious/Parish',
   NULL, 'St. Thomas Parish', '02229276994', NULL, NULL, NULL,
   'Church Road, Goregaon East, Mumbai 400 063.',
   80, FALSE, 1029, 'publish'),

  ('Our Lady of Assumption Church', 'our-lady-assumption', 'Best Compliments', 'Religious/Parish',
   NULL, 'Assumption Parish, Kandivali', NULL, NULL, NULL, 'www.assumptionchurch.in',
   'Dahanukarwadi, Kandivali West, Mumbai 400 067.',
   81, FALSE, 1030, 'publish'),

  ('St. Anthony''s Church, Malwani', 'st-anthony-malwani', 'Best Compliments', 'Religious/Parish',
   NULL, 'St. Anthony''s Parish', NULL, NULL, NULL, NULL,
   'Malwani, Marve Road, Malad West, Mumbai 400 095.',
   82, FALSE, 1031, 'publish'),

  ('Our Lady of Lourdes, Orlem Malad', 'our-lady-lourdes-orlem', 'Best Compliments', 'Religious/Parish',
   NULL, 'Parish of Our Lady of Lourdes', NULL, NULL, NULL, NULL,
   'A pilgrim parish in the heart of Orlem, Malad.',
   83, FALSE, 1032, 'publish'),

  ('Church of Our Lady of Victories', 'our-lady-victories', 'Best Wishes', 'Religious/Parish',
   NULL, 'Parish of Our Lady of Victories', NULL, NULL, NULL, NULL,
   'Best wishes for Sabha Day 2026.',
   84, FALSE, 1033, 'publish'),

  ('St. John Bosco Parish, Borivali', 'st-john-bosco-borivali', 'Best Compliments', 'Religious/Parish',
   'Robert Reny Nazareth', 'St. John Bosco Parish', NULL, NULL, NULL, NULL,
   'St. John Bosco Parish, Borivali West.', 85, FALSE, 1034, 'publish'),

  ('St. Ignatius Church, Jacob Circle', 'st-ignatius-jacob-circle', 'Commercial Ad', 'Religious/Parish',
   NULL, 'St. Ignatius Parish', NULL, NULL, NULL, NULL,
   'Enriching faith through sports -- Ignite Olympics 2026 hosted at Jacob Circle.',
   4, FALSE, 1035, 'publish'),

  ('Ravindra Phatak', 'ravindra-phatak', 'Best Compliments', 'Other',
   'Ravindra Phatak', NULL, '02225802207', '9867006803', NULL, NULL,
   'Ex-Member of the Legislative Council, Maharashtra State.',
   12, FALSE, 1036, 'publish'),

  ('Adv. Tulip Brian Miranda', 'tulip-brian-miranda', 'Best Compliments', 'Other',
   'Adv. Tulip Brian Miranda', NULL, '9820377369', NULL, 'tulip.misquitta@gmail.com', NULL,
   'Municipal Councillor, Ward No. 90. Best compliments from the family.',
   22, FALSE, 1037, 'publish'),

  ('A. Almeida -- Bombay Scientific', 'a-almeida-bombay-scientific', 'Best Compliments', 'Other',
   'A. Almeida', 'Bombay Scientific', '9820115147', NULL, NULL, NULL,
   'Sales office: B12, Divya Smruti, Chincholi Bunder, Link Road, Malad (W), Mumbai 400 064.',
   26, FALSE, 1038, 'publish'),

  ('Research Lab Fine Chem Industries', 'research-lab-finechem', 'Best Compliments', 'Other',
   NULL, 'Research Lab Fine Chem Industries', '9821019151', NULL, NULL, NULL,
   'Fine chemicals for research and industry.',
   36, FALSE, 1039, 'publish'),

  ('PrintUrgent', 'printurgent', 'Best Compliments', 'Other',
   NULL, 'PrintUrgent', '9029009355', NULL, 'printurgent@gmail.com', 'printurgent.com',
   'On-demand printing and print-production services.',
   40, FALSE, 1040, 'publish'),

  ('Ri Rinac Insulations Pvt. Ltd.', 'ri-rinac-insulations', 'Best Compliments', 'Other',
   NULL, 'Ri Rinac Insulations', NULL, NULL, NULL, NULL,
   'Industrial insulation solutions.',
   41, FALSE, 1041, 'publish'),

  ('Emerald Isle', 'emerald-isle', 'Best Compliments', 'Real Estate/Construction',
   NULL, 'Emerald Isle', NULL, NULL, NULL, 'emeraldisleuttan.in',
   'Residential project at Uttan.',
   89, FALSE, 1042, 'publish'),

  ('J.R. Property Consultants', 'jr-property-consultants', 'Best Compliments', 'Real Estate/Construction',
   NULL, 'J.R. Property Consultants', '9820237706', NULL, 'jrproperty9@gmail.com', NULL,
   'Property consultants for residential and commercial real estate.',
   90, FALSE, 1043, 'publish'),

  ('Sweet Angel Home Builders', 'sweet-angel-home-builders', 'Best Compliments', 'Real Estate/Construction',
   'Joshua Samson D''Cruz', 'Sweet Angel Home Builders', NULL, NULL, NULL, NULL,
   'Home builders and renovations.',
   91, FALSE, 1044, 'publish'),

  ('PCPL Falcon Crest', 'pcpl-falcon-crest', 'Commercial Ad', 'Real Estate/Construction',
   NULL, 'Pranav Constructions -- Falcon Crest', '8291285932', NULL, NULL, 'www.pranavconstructions.com',
   'Premium residential homes by Pranav Constructions.',
   92, FALSE, 1045, 'publish'),

  ('Zion Hospitality', 'zion-hospitality', 'Best Compliments', 'Hospitality/Food',
   NULL, 'Zion Hospitality', NULL, NULL, NULL, NULL,
   'Brands include Stacks and Racks, Red Turtle and Pan Asian Bistro.',
   95, FALSE, 1046, 'publish'),

  ('The Gonsalves Family', 'gonsalves-family', 'Best Wishes', 'Individual/Family',
   NULL, NULL, NULL, NULL, NULL, NULL,
   'Best wishes from the Gonsalves family.',
   100, FALSE, 1047, 'publish'),

  ('The Meldan D''Cunha Family', 'meldan-dcunha-family', 'Best Wishes', 'Individual/Family',
   NULL, NULL, NULL, NULL, NULL, NULL,
   'Best wishes from the Meldan D''Cunha family.',
   101, FALSE, 1048, 'publish'),

  ('Wilma Galbao Family', 'wilma-galbao-family', 'Best Wishes', 'Individual/Family',
   NULL, NULL, NULL, NULL, NULL, NULL,
   'Best wishes from the Wilma Galbao family.',
   102, FALSE, 1049, 'publish'),

  ('Jacob & Hilda Rodrigues Family', 'jacob-hilda-rodrigues', 'Best Wishes', 'Individual/Family',
   NULL, NULL, NULL, NULL, NULL, NULL,
   'Best wishes from the Jacob & Hilda Rodrigues family.',
   103, FALSE, 1050, 'publish'),

  ('Mr. & Mrs. Jerome Castillino', 'jerome-castillino-family', 'Best Wishes', 'Individual/Family',
   'Jerome Castillino', 'JRS Services', NULL, NULL, NULL, NULL,
   'Best wishes from Mr. & Mrs. Jerome Castillino and family.',
   104, FALSE, 1051, 'publish'),

  ('Sara, Allan & Sarika Don Crasto', 'crasto-family', 'Best Wishes', 'Individual/Family',
   NULL, NULL, NULL, NULL, NULL, NULL,
   '"Praise the Lord always!" -- Best wishes from the Don Crasto family.',
   105, FALSE, 1052, 'publish'),

  ('Impladent -- Since 1982', 'impladent', 'Best Wishes', 'Healthcare',
   NULL, 'Impladent', '02231912633', NULL, NULL, NULL,
   'Dental implant centre serving Mumbai since 1982.',
   106, FALSE, 1053, 'publish');

-- ============================================================
-- 3) Attach the souvenir PDF to every row that has a page reference.
--    This makes the "View in Souvenir" buttons render on the cards.
-- ============================================================
UPDATE public.sponsors
  SET pdf_url = 'https://ksqdzsgjwixyugddkcfu.supabase.co/storage/v1/object/public/PDFs/Souvenir/sabha%20Day%202026_compressed.pdf'
  WHERE pdf_page IS NOT NULL;
