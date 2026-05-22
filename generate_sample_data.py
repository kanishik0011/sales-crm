import random
from datetime import date
from pathlib import Path

import numpy as np
import pandas as pd

random.seed(42)
np.random.seed(42)

first_names = [
    'Ava','Noah','Mia','Ethan','Sophia','Liam','Isabella','Mason','Olivia','Lucas',
    'Amelia','Elijah','Charlotte','Henry','Harper','Jack','Evelyn','Logan','Abigail',
    'James','Emily','Daniel','Michael','Madison','Samuel','Grace','Joseph','Chloe','David','Zoe'
]
last_names = [
    'Patel','Kim','Garcia','Brown','Nguyen','Martinez','Lopez','Wilson','Anderson','Thomas',
    'Taylor','Moore','Jackson','Martin','Lee','Perez','Thompson','White','Harris','Sanchez',
    'Clark','Ramirez','Lewis','Robinson','Walker','Young','Allen','King','Wright','Scott'
]
industries = [
    'Technology','Healthcare','Finance','Retail','Manufacturing','Education','Logistics','Energy',
    'Telecommunications','Hospitality','Real Estate','Consulting'
]
regions = ['North America','EMEA','APAC','LATAM','Middle East']
lead_sources = ['Website','Referral','Cold Call','Email Campaign','Partner','Event','LinkedIn','Outbound Prospecting']
lead_statuses = ['New','Contacted','Qualified','Unqualified','Nurturing','Converted']
product_catalog = ['CRM Pro','CRM Enterprise','Sales Navigator','Analytics Suite','Customer Support Desk','Revenue Intelligence']
campaign_types = ['email','event','webinar','partner','ad_campaign']
stages = ['Prospecting','Qualification','Proposal','Negotiation','Closed Won','Closed Lost']

companies = [
    'Acme Corp','TechStart Inc','Global Solutions Ltd','Finance Plus','Healthcare Systems','RetailWave',
    'BuildRight Manufacturing','EduBridge','LogiFleet','EnergyGrid','TelAxis','HospitalityHub','RealNest',
    'Finova','MediCore','RetailNova','IndusTrace','CloudKite','DataHarbor','BrightWorks','Zenith Partners',
    'Summit Systems','CopperPeak','NimbusNine','SilverSpring','BlueOrbit'
]


def make_email(name: str) -> str:
    slug = ''.join([c for c in name.lower() if c.isalnum()])
    return f"{slug[:18]}@example.com"


def clamp_int(x: float, lo: int, hi: int) -> int:
    return int(max(lo, min(hi, x)))


# Customers (170)
n_customers = 170
customer_rows = []
for i in range(1, n_customers + 1):
    company = random.choice(companies) + ('' if random.random() < 0.7 else f" {random.randint(1, 50)}")
    name = f"{random.choice(first_names)} {random.choice(last_names)}"
    email = make_email(name.replace(' ', '.'))
    phone = f"555-{random.randint(1000, 9999)}"
    industry = random.choice(industries)
    region = random.choice(regions)
    location = f"{region.split(' ')[0]}-{random.randint(1, 20)}"

    annual = np.random.normal(80000, 35000)

    customer_rows.append({
        'CustomerID': i,
        'CustomerName': company,
        'ContactName': name,
        'Email': email,
        'Phone': phone,
        'Industry': industry,
        'Region': region,
        'Location': location,
        'Status': random.choices(['active', 'inactive'], weights=[0.86, 0.14])[0],
        'CustomerSince': str(date(2018 + random.randint(0, 5), random.randint(1, 12), random.randint(1, 28))),
        'AnnualContractValue': clamp_int(annual, 15000, 350000),
    })

df_customers = pd.DataFrame(customer_rows)


# Sales (250)
n_sales = 250
prob_map = {
    'Prospecting': 15,
    'Qualification': 35,
    'Proposal': 55,
    'Negotiation': 70,
    'Closed Won': 100,
    'Closed Lost': 0,
}
rep_pool = [
    'John Sales','Sarah Manager','Mike Account','Lisa Marketing','David Product','Emma Executive',
    'Chris Sales','Pat Rivera','Jordan Lee','Taylor Chen'
]
stages_weights = [15, 25, 25, 20, 10, 5]

sales_rows = []
for sid in range(1, n_sales + 1):
    cust = df_customers.sample(1).iloc[0]
    stage = random.choices(stages, weights=stages_weights)[0]

    amount_raw = np.random.normal(60000, 45000)
    amount = clamp_int(amount_raw, 5000, 500000)
    probability = prob_map[stage]

    expected_close = (
        date(2024, random.randint(1, 12), random.randint(1, 28))
        if random.random() < 0.8
        else date(2025, random.randint(1, 12), random.randint(1, 28))
    )

    close_date = expected_close if stage in ['Closed Won', 'Closed Lost'] else None
    loss_reason = ''
    if stage == 'Closed Lost':
        loss_reason = random.choice(['Price', 'Competitor', 'Timing', 'No decision', 'Missing requirements'])

    product = random.choice(product_catalog)

    sales_rows.append({
        'SaleID': sid,
        'CustomerID': int(cust['CustomerID']),
        'CustomerName': cust['CustomerName'],
        'SalesRep': random.choice(rep_pool),
        'Region': cust['Region'],
        'Stage': stage,
        'ProbabilityPct': probability,
        'Amount': amount,
        'ForecastAmount': int(amount * (probability / 100)),
        'Product': product,
        'CreatedDate': str(date(2024, random.randint(1, 12), random.randint(1, 28))),
        'ExpectedCloseDate': str(expected_close),
        'CloseDate': str(close_date) if close_date else '',
        'LossReason': loss_reason,
        'Status': 'active' if stage not in ['Closed Won', 'Closed Lost'] else ('won' if stage == 'Closed Won' else 'lost'),
    })

df_sales = pd.DataFrame(sales_rows)


# Leads (220)
n_leads = 220
lead_rows = []
for lid in range(1, n_leads + 1):
    lead_name = f"{random.choice(first_names)} {random.choice(last_names)}"
    company = random.choice(companies) + ('' if random.random() < 0.75 else f" {random.randint(1, 80)}")
    industry = random.choice(industries)
    region = random.choice(regions)
    status = random.choices(lead_statuses, weights=[18, 20, 25, 12, 15, 10])[0]

    lead_score_raw = np.random.normal(65, 18)
    lead_score = clamp_int(lead_score_raw, 10, 99)

    lead_rows.append({
        'LeadID': lid,
        'LeadName': lead_name,
        'Company': company,
        'Email': make_email(lead_name.replace(' ', '.')),
        'Phone': f"555-{random.randint(1000, 9999)}",
        'Industry': industry,
        'Region': region,
        'Source': random.choice(lead_sources),
        'LeadStatus': status,
        'LeadScore': lead_score,
        'CreatedDate': str(date(2024, random.randint(1, 12), random.randint(1, 28))),
        'LastTouchDate': str(date(2024, random.randint(1, 12), random.randint(1, 28))),
    })

df_leads = pd.DataFrame(lead_rows)


# Campaigns (90)
n_campaigns = 90
campaign_rows = []
for cid in range(1, n_campaigns + 1):
    owner = random.choice(['Lisa Marketing', 'Emma Executive', 'Sarah Manager', 'Chris Sales', 'Taylor Chen', 'Jordan Lee'])
    ctype = random.choice(campaign_types)

    start = date(2024, random.randint(1, 10), random.randint(1, 20))
    end_month = start.month + random.randint(1, 2) if start.month <= 10 else 12
    end_day = random.randint(1, 28)
    end = date(start.year, end_month, end_day)

    budget_raw = np.random.normal(60000, 25000)
    budget = clamp_int(budget_raw, 5000, 250000)
    revenue_generated = int(budget * np.random.uniform(1.0, 4.5))
    roi = round((revenue_generated - budget) / budget * 100, 2)

    leads_gen_raw = np.random.normal(120, 60)
    leads_gen = clamp_int(leads_gen_raw, 10, 600)
    conversions = int(leads_gen * np.random.uniform(0.05, 0.25))

    campaign_rows.append({
        'CampaignID': cid,
        'CampaignName': f"Q{random.randint(1, 4)} {random.choice(['Launch', 'Engagement', 'Partner', 'Growth', 'Expansion'])} #{cid}",
        'Type': ctype,
        'Owner': owner,
        'Region': random.choice(regions),
        'Status': random.choices(['active', 'completed'], weights=[0.55, 0.45])[0],
        'Budget': budget,
        'Spend': int(budget * np.random.uniform(0.4, 1.0)),
        'LeadsGenerated': leads_gen,
        'Conversions': conversions,
        'RevenueGenerated': revenue_generated,
        'ROI_Pct': roi,
        'StartDate': str(start),
        'EndDate': str(end),
    })

df_campaigns = pd.DataFrame(campaign_rows)


# Revenue (36 months x 5 regions = 180)
months = pd.date_range('2023-10-01', periods=36, freq='MS')
base_map = {
    'North America': 180000,
    'EMEA': 90000,
    'APAC': 120000,
    'LATAM': 45000,
    'Middle East': 60000,
}

rev_rows = []
for m in months:
    for r in regions:
        base = base_map[r]
        season = 1.0 + 0.15 * np.sin((m.month / 12) * 2 * np.pi)
        noise = np.random.normal(0, 9000)
        gross = int(base * season + noise)
        gross = clamp_int(gross, 15000, 600000)

        pipeline_in = int(gross * np.random.uniform(0.25, 0.7))
        win_rate = float(np.random.uniform(0.25, 0.7))

        rev_rows.append({
            'Month': m.strftime('%Y-%m'),
            'Region': r,
            'MonthlyRevenue': gross,
            'PipelineCreated': pipeline_in,
            'WinRate': round(win_rate, 3),
            'ChurnPct': round(float(np.random.uniform(0.01, 0.06)), 3),
        })

df_revenue = pd.DataFrame(rev_rows)


# Regions
regions_rows = []
for r in regions:
    regions_rows.append({
        'Region': r,
        'CountryCount': random.randint(6, 18),
        'SalesTargetAnnual': int(random.choice([500000, 650000, 800000, 950000])),
    })

df_regions = pd.DataFrame(regions_rows)


# TeamPerformance (3 years x 4 quarters x 6 teams = 72)
teams = ['Sales Representative', 'Sales Manager', 'Account Manager', 'Marketing Team', 'Product Manager', 'Executive Leadership']
quarters = ['Q1', 'Q2', 'Q3', 'Q4']
perf_rows = []
for year in [2023, 2024, 2025]:
    for q in quarters:
        for t in teams:
            quota = clamp_int(np.random.normal(300000, 120000), 80000, 900000)
            actual = clamp_int(np.random.normal(270000, 110000), 50000, 950000)
            achievement = round(float(np.random.normal(0.88, 0.12)), 3)
            avg_deal = clamp_int(np.random.normal(65000, 25000), 8000, 250000)
            lead_resp = round(float(np.random.uniform(2, 24)), 2)

            perf_rows.append({
                'Year': year,
                'Quarter': q,
                'Team': t,
                'Quota': quota,
                'Actual': actual,
                'AchievementPct': achievement,
                'AvgDealSize': avg_deal,
                'LeadResponseTimeHours': lead_resp,
            })

df_perf = pd.DataFrame(perf_rows)


# ForecastData (24 months x 5 regions = 120)
forecast_rows = []
for m in pd.date_range('2024-01-01', periods=24, freq='MS'):
    for r in regions:
        base_mu = 120000 if r == 'North America' else 70000
        forecast = clamp_int(np.random.normal(base_mu, 35000), 15000, 400000)
        lower = int(forecast * 0.85)
        upper = int(forecast * 1.15)
        bias = round(float(np.random.uniform(-0.12, 0.12)), 3)

        forecast_rows.append({
            'ForecastMonth': m.strftime('%Y-%m'),
            'Region': r,
            'ForecastRevenue': forecast,
            'ConfidenceLower': lower,
            'ConfidenceUpper': upper,
            'Bias': bias,
            'ModelUsed': random.choice(['ARIMA', 'Prophet', 'RollingAvg', 'WeightedPipeline']),
        })

df_forecast = pd.DataFrame(forecast_rows)


out_path = Path('sample_data.xlsx')
with pd.ExcelWriter(out_path, engine='openpyxl') as writer:
    df_customers.to_excel(writer, sheet_name='Customers', index=False)
    df_sales.to_excel(writer, sheet_name='Sales', index=False)
    df_leads.to_excel(writer, sheet_name='Leads', index=False)
    df_campaigns.to_excel(writer, sheet_name='Campaigns', index=False)
    df_revenue.to_excel(writer, sheet_name='Revenue', index=False)
    df_regions.to_excel(writer, sheet_name='Regions', index=False)
    df_perf.to_excel(writer, sheet_name='TeamPerformance', index=False)
    df_forecast.to_excel(writer, sheet_name='ForecastData', index=False)

print('Wrote', out_path.resolve())
print('Customers:', len(df_customers))
print('Sales:', len(df_sales))
print('Leads:', len(df_leads))
print('Campaigns:', len(df_campaigns))

