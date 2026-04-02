'use client';

import { useState, useRef, useCallback } from 'react';
import { useAudioSystem } from '@/hooks/useAudioSystem';

// ─── Types ────────────────────────────────────────────────────────────────────

type BatchKey = '25' | '24' | '23';

interface TeamMember {
  name: string;
  designation: string;
  /** Absolute URL or relative path to profile photo. Empty string uses initials fallback. */
  image: string;
  linkedin: string;
  email: string;
}

// ─── Team Data (sourced from TEAM/linkedin_profiles_batch_23_25.xlsx) ────────

const TEAM: Record<BatchKey, TeamMember[]> = {
  '23': [
    { name: 'Swasti Dubey',      designation: 'President',                             image: 'https://media.licdn.com/dms/image/v2/D5603AQHguxtEP-3NDg/profile-displayphoto-shrink_200_200/B56ZZSYk9.HoAY-/0/1745138897246?e=1776902400&v=beta&t=5RQEwW_TEg3b2AEax4d14ekjmt7qHSIuI44Ehws5pqk', linkedin: 'https://www.linkedin.com/in/swasti-dubey-6a7175256/', email: '' },
    { name: 'Harsh Shah',        designation: 'Vice President',                        image: 'https://media.licdn.com/dms/image/v2/D4E03AQHnfZxg40_Zyg/profile-displayphoto-shrink_400_400/B4EZX9dilnG0Ag-/0/1743714136772?e=1776902400&v=beta&t=u39npIENdWanpd_fmcJREMplmOVkOBmdGXcHoIWqBhM', linkedin: 'https://www.linkedin.com/in/harsh-shah-969b28288/', email: '' },
    { name: 'Raghav Leekha',     designation: 'Director of Projects',                  image: 'https://media.licdn.com/dms/image/v2/D4E03AQGSJv9czpDiNw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1724200263512?e=1776902400&v=beta&t=YfMMiVKTWQ_foi2q-okGqmSahdoCFBe8lgbzc54yZJU', linkedin: 'https://www.linkedin.com/in/raghavleekha', email: '' },
    { name: 'Kavan Lad',         designation: 'Executive Director',                    image: 'https://media.licdn.com/dms/image/v2/D4D03AQH900ME7aL59g/profile-displayphoto-shrink_400_400/B4DZOAtR5zHoAg-/0/1733031174537?e=1776902400&v=beta&t=8j_YLeZHflbytNvUzyQsnlizCBciWPyyGfZ8Y-T5Wq0', linkedin: 'https://www.linkedin.com/in/kavan-lad', email: '' },
    { name: 'Nishk Davawala',    designation: 'Director of Marketing and Partnerships', image: 'https://media.licdn.com/dms/image/v2/D4D03AQE9xNxOmpbPLA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1724837066429?e=1776902400&v=beta&t=k9yaV50JHf1UeD1P9M95F5BtVjMWdR3ueE68WK6PIDI', linkedin: 'https://www.linkedin.com/in/nishk-davawala', email: '' },
    { name: 'Yash Thakkar',      designation: 'Financial Review Committee',            image: 'https://media.licdn.com/dms/image/v2/D5603AQE4HS--kpd0XA/profile-displayphoto-scale_400_400/B56ZyCQv6iKgAg-/0/1771711957055?e=1776902400&v=beta&t=sim2c1VVcrV5hoH9TFF5MBWvWNzWPhibd-Qg-thZPDI', linkedin: 'https://www.linkedin.com/in/yash-thakkar-1a5b242a9', email: '' },
    { name: 'Parva Shah',        designation: 'Financial Review Committee',            image: 'https://media.licdn.com/dms/image/v2/D5603AQF-22qQCsBPiA/profile-displayphoto-scale_400_400/B56ZpUrZOLHYAg-/0/1762357253835?e=1776902400&v=beta&t=BKN5fJYkrWVc5mYLR0cywOLo5Qaynzu1dygyvwpIu3o', linkedin: 'https://www.linkedin.com/in/parva-shah-36255628b', email: '' },
  ],
  '24': [
    { name: 'Srijan Sahay',              designation: 'Technical Associate',   image: 'https://media.licdn.com/dms/image/v2/D5603AQF64cn-X9oDfQ/profile-displayphoto-scale_400_400/B56Zs_xnz3HIAg-/0/1766301533627?e=1776902400&v=beta&t=O1AmqANqO-aj1FV2Le7YqRyR4mG8EdLTg11X74ngklY', linkedin: 'https://www.linkedin.com/in/srijansahay05', email: '' },
    { name: 'Sarvesh Prakash',           designation: 'Partnership Associate', image: 'https://media.licdn.com/dms/image/v2/D5603AQFYl02cHFfy-A/profile-displayphoto-scale_400_400/B56ZwlAUsHJEAk-/0/1770147368581?e=1776902400&v=beta&t=noIq6qGxhSqlUBuL-Og2LS1gzxBbpkmDAQAZpxY_wTs', linkedin: 'https://www.linkedin.com/in/sarveshprakash', email: '' },
    { name: 'Harshit Saini',             designation: 'Partnership Associate', image: 'https://media.licdn.com/dms/image/v2/D4E03AQEuGDMBgStdmQ/profile-displayphoto-shrink_400_400/B4EZPgXDOkGwCA-/0/1734635960869?e=1776902400&v=beta&t=yIqvt6gXVzgIUYKsUglNEKruoS4KCyVpqOZezjSlFfw', linkedin: 'https://www.linkedin.com/in/harshit~saini', email: '' },
    { name: 'Chaitanya Goyal',           designation: 'Marketing Associate',   image: 'https://media.licdn.com/dms/image/v2/D5603AQEJk9MxTeBpRw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726481884774?e=1776902400&v=beta&t=KLLaKO7StBZI1AuTVE2g4UFoS2I_gzSf-zsXBDjHEcU', linkedin: 'https://www.linkedin.com/in/chaitanya-goyal', email: '' },
    { name: 'Shreyashi Mahanta',         designation: 'Marketing Associate',   image: 'https://media.licdn.com/dms/image/v2/D4E03AQHGHkpy1gWqfw/profile-displayphoto-scale_400_400/B4EZifUahVHgAk-/0/1755019587494?e=1776902400&v=beta&t=Hg5_mRnLUb88QmbmfKejfdAfenxf2UzOZPVyJiO22hA', linkedin: 'https://www.linkedin.com/in/shreyashimahanta', email: '' },
    { name: 'Siddharth Sudun',           designation: 'Marketing Associate',   image: 'https://media.licdn.com/dms/image/v2/D5603AQEi8m4KMb4lFw/profile-displayphoto-scale_400_400/B56ZmIy7mEG4Ag-/0/1758936678239?e=1776902400&v=beta&t=Edl5QzREnCEK9IU7HIHxI-j2EKpTiarVRMmAHHCKeRA', linkedin: 'https://www.linkedin.com/in/siddharthsudun', email: '' },
    { name: 'Mithielesh Ganesan Babu',   designation: 'Marketing Associate',   image: 'https://media.licdn.com/dms/image/v2/D4E03AQHB2ru_u1ktgQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729007176702?e=1776902400&v=beta&t=dQLcRMkNKn4N4k6_LrKPiH42Ce1GN1-13pBu-OO_1EQ', linkedin: 'https://www.linkedin.com/in/mithielesh-ganesan-babu-56b3032b0', email: '' },
    { name: 'Krrish Narrayan',           designation: 'Partnership Associate', image: 'https://media.licdn.com/dms/image/v2/D5603AQF-6H9XwRJOBA/profile-displayphoto-shrink_400_400/B56ZTPyOKrGoAk-/0/1738652853261?e=1776902400&v=beta&t=4lSysRi8GwY4c-u-H3Hd2UnP9KnC_L8gE_u6zFzKHiU', linkedin: 'https://www.linkedin.com/in/krrish-narrayan-a63865263', email: '' },
    { name: 'Tushar Kakwani',            designation: 'Partnership Associate', image: 'https://media.licdn.com/dms/image/v2/D4E03AQHlhCEisHPpmQ/profile-displayphoto-shrink_400_400/B4EZYHrSO9GYAg-/0/1743885514989?e=1776902400&v=beta&t=B3TuUndW0trWEbz88cUfrcL9zm1whxXXgDs5RKpi78c', linkedin: 'https://www.linkedin.com/in/tushar-kakwani-231b52321', email: '' },
  ],
  '25': [
    { name: 'Pratham Jain',      designation: 'Marketing Volunteer',   image: 'https://media.licdn.com/dms/image/v2/D5603AQGXeXXmYGp6vg/profile-displayphoto-scale_200_200/B56ZzeYQTnKUAY-/0/1773257428856?e=1776902400&v=beta&t=Tt-H8dQH8tGG69caAfDwsPMDxqWvhqBxDpIyI0ebUPU', linkedin: 'https://www.linkedin.com/in/pratham-jain-589958290/', email: '' },
    { name: 'Rishu Raj Gupta',   designation: 'Partnership Volunteer', image: 'https://media.licdn.com/dms/image/v2/D5635AQEglGHdGQuAAg/profile-framedphoto-shrink_400_400/B56Zv9zB61IsAg-/0/1769489571820?e=1775649600&v=beta&t=T5tf96Q6k9ENc8RWcIYfsdhJId1HV9CPkfKCD4Q9Jl4', linkedin: 'https://www.linkedin.com/in/rishu-raj-gupta-650269337/', email: '' },
    { name: 'Viren Suthar',      designation: 'Partnership Volunteer', image: 'https://media.licdn.com/dms/image/v2/D4E03AQFlw6UaXcOQ0g/profile-displayphoto-scale_200_200/B4EZmblEBrGoAY-/0/1759251810564?e=1776902400&v=beta&t=hN0VCd9lDnfEhp8zuyExYjfGdvScvlkGUWxOAWlzBQA', linkedin: 'https://www.linkedin.com/in/viren-suthar-846a86387/', email: '' },
    { name: 'Atharva Choudhari', designation: 'Marketing Volunteer',   image: 'https://media.licdn.com/dms/image/v2/D4E03AQFq2TJ_g1_7xA/profile-displayphoto-scale_400_400/B4EZmWD5z2GYAg-/0/1759159231659?e=1776902400&v=beta&t=Gs_oN_IXsAQrsRbtZz-yAC0xHJR9JJ7NiqlgjDD_s4k', linkedin: 'https://www.linkedin.com/in/atharva-choudhari-194624387/', email: '' },
    { name: 'Hryday Lath',       designation: 'Partnership Volunteer', image: 'https://media.licdn.com/dms/image/v2/D5603AQHwR21aHPU8AA/profile-displayphoto-scale_200_200/B56Z1NlwBPIIAc-/0/1775123237602?e=1776902400&v=beta&t=yEaL2caFsvgyDZ0JdZsAHCYvYeLxggnG92-zvgYeUQE', linkedin: 'https://www.linkedin.com/in/hryday-lath-b30b42302', email: '' },
    { name: 'Aditya Narang',     designation: 'Marketing Volunteer',   image: 'https://media.licdn.com/dms/image/v2/D5603AQESbWNsckKO5w/profile-displayphoto-scale_400_400/B56ZxcsiUEJsAk-/0/1771081709276?e=1776902400&v=beta&t=gjNIHRL0k7W--TGSPvQ-QO7ZNdUZpApBAY_t5yirHVQ', linkedin: 'https://www.linkedin.com/in/narangaditya/', email: '' },
    { name: 'Shourya Jhavar',    designation: 'Marketing Volunteer',   image: 'https://media.licdn.com/dms/image/v2/D5603AQHFQXTbQA8Kdw/profile-displayphoto-scale_200_200/B56Zz1teVZKcAY-/0/1773648871022?e=1776902400&v=beta&t=8sdloDP5WiQsBD6pe9MQZK-9VcWDIoSepwNQ18-7nnk', linkedin: 'https://www.linkedin.com/in/shourya-jhavar-663bb03b4/', email: '' },
    { name: 'Krishna Gupta',     designation: 'Marketing Volunteer',   image: 'https://media.licdn.com/dms/image/v2/D4D03AQFh86N1jnApwA/profile-displayphoto-scale_200_200/B4DZqHMi9vJcAY-/0/1763204808510?e=1776902400&v=beta&t=y_8JwilxAYYiJEL_-D74LNbnAe9uktp2f7DxJCn8v0M', linkedin: 'https://www.linkedin.com/in/krishna-gupta-1536b6380/', email: '' },
    { name: 'Mitali K',          designation: 'Marketing Volunteer',   image: 'https://media.licdn.com/dms/image/v2/D4E03AQErDA6wHja2Qg/profile-displayphoto-scale_200_200/B4EZgXlYVXHEAY-/0/1752742333373?e=1776902400&v=beta&t=-QgLubVVSiUcaACEqDCHBUKVUy3yszcce1QI0peB0RE', linkedin: 'https://www.linkedin.com/in/mitali-k-18b451373/', email: '' },
    { name: 'Nikhil Arora',      designation: 'Partnership Volunteer', image: '', linkedin: 'https://www.linkedin.com/in/nikhil-arora-943477397/', email: '' },
    { name: 'Upvan Agarwal',     designation: 'Partnership Volunteer', image: 'https://media.licdn.com/dms/image/v2/D5603AQEZKAsPQLlRFA/profile-displayphoto-scale_200_200/B56Zt0WOWyG4Ac-/0/1767183543991?e=1776902400&v=beta&t=AyIPos9QVjCTNCy2JZ54WK7MlE558hxITdlqT8IwxtQ', linkedin: 'https://www.linkedin.com/in/upvan-agarwal-b40675355/', email: '' },
    { name: 'Himanshi Garg',     designation: 'Partnership Volunteer', image: '', linkedin: 'https://www.linkedin.com/in/himanshi-garg-064a4b3a7/', email: '' },
    { name: 'Maharnava Sharma',  designation: 'Marketing Volunteer',   image: 'https://media.licdn.com/dms/image/v2/D5603AQHuSoxTQLIfyA/profile-displayphoto-scale_200_200/B56ZvatrvTIcAY-/0/1768900970071?e=1776902400&v=beta&t=Mfh1u3tX3oC2AfcVsXyvzrJfM4ziH2497AZwAnpydPU', linkedin: 'https://www.linkedin.com/in/maharnava-sharma-44079a386/', email: '' },
    { name: 'Navaneeth',         designation: 'Marketing Volunteer',   image: '', linkedin: '', email: '' },
    { name: 'Priyanshi',         designation: 'Partnership Volunteer',   image: '', linkedin: '', email: '' },

  ],
};

// Avatar colors cycled from the world page palette
const AVATAR_PALETTE = [
  '#4398cd', '#e8c840', '#d82d17', '#47a639',
  '#ff4477', '#00ffff', '#ffb852', '#9c59b6',
];

function getInitials(name: string) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconPeople() {
  return (
    <svg viewBox="0 0 22 17" width="22" height="17" fill="currentColor" shapeRendering="crispEdges">
      {/* left person */}
      <rect x="0" y="0" width="6" height="6" />
      <rect x="0" y="8" width="8" height="9" />
      {/* right person */}
      <rect x="16" y="0" width="6" height="6" />
      <rect x="14" y="8" width="8" height="9" />
      {/* center person (slightly taller) */}
      <rect x="8" y="0" width="6" height="6" />
      <rect x="7" y="8" width="8" height="9" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" shapeRendering="crispEdges">
      <rect x="1" y="1" width="14" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="3.5" y="6.5" width="2" height="6" />
      <rect x="3.5" y="3.5" width="2" height="2" />
      <path d="M7.5 6.5h2v1c.4-.6 1.2-1 2-1 1.7 0 2.5 1 2.5 3v3h-2V10c0-.9-.3-1.4-1-1.4s-1.2.5-1.2 1.4v2.5H7.5V6.5z" />
    </svg>
  );
}

function IconEmail() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" shapeRendering="crispEdges">
      <rect x="1" y="3" width="14" height="10" rx="1" />
      <path d="M1 4.5l7 4.5 7-4.5" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TeamPanel() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<BatchKey>('23');
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { playHoverSound, playClickSound } = useAudioSystem();

  // Delayed close so the mouse can travel from trigger → panel without flicker.
  // mouseleave fires when exiting the DOM subtree, but the absolute-positioned
  // panel may still briefly exit the container's painted bounds.
  const scheduleClose = useCallback(() => {
    leaveTimer.current = setTimeout(() => setOpen(false), 120);
  }, []);

  const cancelClose = useCallback(() => {
    if (leaveTimer.current) {
      clearTimeout(leaveTimer.current);
      leaveTimer.current = null;
    }
    setOpen(true);
  }, []);

  const members = TEAM[tab];

  return (
    <div
      className="tp-container"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      {/* ── Trigger bubble ───────────────────────────────────────────────── */}
      <div
        className="tp-trigger"
        onMouseEnter={playHoverSound}
        role="button"
        aria-label="Meet the team"
        aria-expanded={open}
      >
        <IconPeople />
      </div>

      {/* ── Expandable panel ─────────────────────────────────────────────── */}
      <div
        className={`tp-panel${open ? ' tp-open' : ''}`}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        role="region"
        aria-label="Team members"
      >
        {/* Pixel border corners (uses globally-defined .card-corner) */}
        <div className="card-corner tl">┌</div>
        <div className="card-corner tr">┐</div>
        <div className="card-corner bl">└</div>
        <div className="card-corner br">┘</div>

        {/* Header */}
        <div className="tp-header">
          <span className="level-badge tp-badge">◆ MEET THE TEAM ◆</span>
        </div>

        {/* Batch tabs */}
        <div className="tp-tabs" role="tablist">
          {(['23', '24', '25'] as BatchKey[]).map((b) => (
            <button
              key={b}
              role="tab"
              aria-selected={tab === b}
              className={`tp-tab${tab === b ? ' tp-tab-active' : ''}`}
              onClick={() => { setTab(b); playClickSound(); }}
              onMouseEnter={playHoverSound}
            >
              BATCH &apos;{b}
              <span className="tp-count">{TEAM[b].length}</span>
            </button>
          ))}
        </div>

        {/* Member list */}
        <div className="tp-list" role="tabpanel">
          {members.map((m, i) => (
            <div key={`${m.name}-${i}`} className="tp-card">
              {/* Avatar */}
              <div
                className="tp-avatar"
                style={{ background: AVATAR_PALETTE[i % AVATAR_PALETTE.length] }}
                aria-hidden="true"
              >
                {m.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.image} alt={m.name} />
                ) : (
                  <span>{getInitials(m.name)}</span>
                )}
              </div>

              {/* Info */}
              <div className="tp-info">
                <div className="tp-name">{m.name}</div>
                <div className="tp-role">{m.designation}</div>
                <div className="tp-links">
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tp-social"
                    aria-label={`${m.name} on LinkedIn`}
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                  >
                    <IconLinkedIn />
                  </a>
                  <a
                    href={`mailto:${m.email}`}
                    className="tp-social"
                    aria-label={`Email ${m.name}`}
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                  >
                    <IconEmail />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
