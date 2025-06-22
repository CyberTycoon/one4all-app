export interface User {
  id: string;
  name: string;
  email: string;
  restaurant: {
    name: string;
    type: string;
    location: string;
  };
  services: Service[];
  onboardingComplete: boolean;
}

export interface Service {
  id: 'presence' | 'qr' | 'itinerary' | 'messaging';
  name: string;
  active: boolean;
  monthlyFee?: number;
  config?: any;
}

export interface STRUnit {
  id: string;
  name: string;
  neighborhood: string;
  size: string;
  basePrice: number;
  currentBid?: number;
  status: 'available' | 'bidding' | 'won' | 'lost';
  guestVolume: number;
}

export interface ItineraryCategory {
  id: string;
  name: string;
  description: string;
  participating: boolean;
  discount: number;
  redemptionCap?: number;
}

export interface ContentPost {
  id: string;
  date: string;
  type: 'text' | 'image' | 'video';
  content: string;
  caption: string;
  scheduled: boolean;
  aiGenerated?: boolean;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  tags: string[];
  source: 'manual' | 'csv' | 'memstays' | 'social';
  createdAt: string;
  lastEngagement?: string;
  engagementHistory: EngagementEvent[];
  optedOut: boolean;
}

export interface EngagementEvent {
  id: string;
  type: 'email_open' | 'email_click' | 'sms_reply' | 'dm_reply' | 'campaign_sent';
  campaignId?: string;
  timestamp: string;
  metadata?: any;
}

export interface Campaign {
  id: string;
  name: string;
  type: 'sms' | 'email' | 'dm';
  status: 'draft' | 'scheduled' | 'sent' | 'sending';
  subject?: string;
  content: string;
  audienceType: 'all' | 'tags' | 'custom';
  audienceTags?: string[];
  audienceContacts?: string[];
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
  stats: CampaignStats;
  template?: string;
}

export interface CampaignStats {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  replied: number;
  bounced: number;
  unsubscribed: number;
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: 'signup' | 'birthday' | 'milestone' | 'inactivity' | 'custom';
  triggerConditions: any;
  delay: number; // minutes
  channel: 'sms' | 'email' | 'dm';
  template: string;
  active: boolean;
  createdAt: string;
  stats: {
    triggered: number;
    sent: number;
    opened: number;
    clicked: number;
  };
}

export interface MessageTemplate {
  id: string;
  name: string;
  type: 'sms' | 'email' | 'dm';
  subject?: string;
  content: string;
  variables: string[];
  category: 'welcome' | 'promotion' | 'reminder' | 'follow-up' | 'custom';
  createdAt: string;
}