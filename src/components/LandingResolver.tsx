import { PartnerConfig } from '@/types/partner';
import { OleLifeLayout } from '@/components/landing/templates/olelife/OleLifeLayout';
import { ClassicLayout } from '@/components/landing/templates/classic/ClassicLayout';
import RdaLayout from '@/components/landing/templates/rda/RdaLayout';

export const LandingResolver = ({ config }: { config: PartnerConfig }) => {
  switch (config.template_id) {
    case 'rda': return <RdaLayout config={config} />;
    case 'olelife': return <OleLifeLayout config={config} />;
    default: return <ClassicLayout config={config} />;
  }
};
