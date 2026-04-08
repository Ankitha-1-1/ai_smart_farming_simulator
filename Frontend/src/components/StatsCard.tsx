import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

const StatsCard = ({ icon: Icon, label, value }: StatsCardProps) => {
  return (
    <div className="farm-card flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-display text-lg font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
