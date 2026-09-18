import React from 'react';
import {
  CheckCircle2, Clock, User2, Search, Zap,
  GitCompare, Star, Send } from
'lucide-react';

import { formatTime } from '../utils/helpers';















export const QueryTimeline = ({ query }) => {
  const steps = [
  {
    label: 'Query Received',
    time: formatTime(query.receivedAt),
    person: 'System',
    done: true,
    icon: <Clock size={10} />,
    color: '#1565c0'
  },
  {
    label: 'Assigned to Pricing',
    time: query.assignedAt ? formatTime(query.assignedAt) : '—',
    delta: query.assignedAt ? '+4 min' : undefined,
    person: query.assignedTo,
    done: !!query.assignedAt,
    icon: <User2 size={10} />,
    color: '#7c3aed'
  },
  {
    label: 'Query Analysed',
    time: query.ratesFoundAt ? formatTime(query.ratesFoundAt) : '—',
    delta: query.ratesFoundAt ? '+13 min' : undefined,
    person: query.assignedTo,
    done: !!query.ratesFoundAt,
    icon: <Search size={10} />,
    color: '#0288d1'
  },
  {
    label: 'Rates Found',
    time: query.ratesFoundAt ? formatTime(query.ratesFoundAt) : '—',
    delta: query.ratesFoundAt ? '+4 min' : undefined,
    person: 'Rate Master',
    done: !!query.ratesFoundAt,
    icon: <Zap size={10} />,
    color: '#f59e0b'
  },
  {
    label: 'Rate Comparison Completed',
    time: query.ratesComparedAt ? formatTime(query.ratesComparedAt) : '—',
    delta: query.ratesComparedAt ? '+6 min' : undefined,
    person: query.assignedTo,
    done: !!query.ratesComparedAt,
    icon: <GitCompare size={10} />,
    color: '#16a34a'
  },
  {
    label: 'Best Rate Identified',
    time: query.ratesComparedAt ? formatTime(query.ratesComparedAt) : '—',
    delta: query.ratesComparedAt ? '+1 min' : undefined,
    person: 'Smart Recommendation',
    done: !!query.ratesComparedAt,
    icon: <Star size={10} />,
    color: '#ea580c'
  },
  {
    label: 'Rate Reverted to Customer',
    time: query.ratesRevertedAt ? formatTime(query.ratesRevertedAt) : '—',
    delta: query.ratesRevertedAt ? '+7 min' : undefined,
    person: query.assignedTo,
    done: !!query.ratesRevertedAt,
    icon: <Send size={10} />,
    color: '#16a34a'
  },
  {
    label: 'Customer Confirmation',
    time: ['Confirmed'].includes(query.status) ? 'Received' : 'Awaiting',
    person: query.customer,
    done: query.status === 'Confirmed',
    icon: <CheckCircle2 size={10} />,
    color: '#0a1628'
  }];


  return (
    <div style={{ padding: '4px 0' }}>
      {steps.map((step, idx) =>
      <div
        key={idx}
        className="timeline-item"
        style={{ marginBottom: idx < steps.length - 1 ? 16 : 0 }}>
        
          {/* Connector line */}
          {idx < steps.length - 1 &&
        <div style={{
          position: 'absolute', left: 9, top: 22, bottom: -8, width: 2,
          background: step.done && steps[idx + 1].done ? step.color : '#e2e8f0',
          opacity: step.done && steps[idx + 1].done ? 0.4 : 1,
          transition: 'background 0.3s'
        }} />
        }

          <div className="timeline-dot" style={{
          background: step.done ? step.color : '#e2e8f0',
          color: step.done ? 'white' : '#94a3b8'
        }}>
            {step.icon}
          </div>

          <div style={{ paddingLeft: 8 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: step.done ? '#0a1628' : '#94a3b8' }}>
                {step.time}
              </span>
              {step.delta && step.done &&
            <span style={{ fontSize: 11, color: '#16a34a', background: '#f0fdf4', padding: '0 5px', borderRadius: 4, fontWeight: 600 }}>
                  {step.delta}
                </span>
            }
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: step.done ? '#334155' : '#94a3b8', marginTop: 1 }}>
              {step.label}
            </div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 1 }}>
              {step.person}
            </div>
          </div>
        </div>
      )}
    </div>);

};