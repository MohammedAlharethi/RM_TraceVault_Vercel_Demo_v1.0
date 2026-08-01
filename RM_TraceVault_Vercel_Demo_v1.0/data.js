window.TRACEVAULT_DATA={
 product:{name:'RM TraceVault',tagline:'TRACE. SECURE. PRESERVE.',version:'Public Concept Demo 1.1'},
 tenants:[
  {id:'demo',name:'Demo Organization',plan:'Professional',storage:42.8,allowance:100,users:24,cases:18,evidence:12840},
  {id:'enterprise',name:'Sample Regulated Enterprise',plan:'Sovereign Enterprise',storage:188.4,allowance:300,users:62,cases:31,evidence:28620},
  {id:'legal',name:'Sample Legal & Compliance Team',plan:'Standard',storage:12.6,allowance:25,users:12,cases:9,evidence:4210}
 ],
 editions:[
  {name:'Evidence Vault — Standard',tag:'Foundation',scope:'Configured scope',support:'Business-hours support',features:['Immutable preservation','Authenticated encryption','Integrity verification','Custody timeline','Technical export','Core reporting']},
  {name:'Evidence Trust — Professional',tag:'Most selected',scope:'Expanded scope',support:'Priority support',features:['Everything in Standard','Advanced retention','Legal Hold','Case workspace','Enterprise SSO','Offline verification']},
  {name:'Sovereign Enterprise',tag:'Regulated',scope:'Enterprise scope',support:'Enhanced enterprise support',features:['Enhanced tenant controls','Advanced key custody','Private connectivity option','Service governance','Custom integrations','Expanded reporting']},
  {name:'Strategic Dedicated',tag:'Custom',scope:'Dedicated design',support:'Named service governance',features:['Dedicated isolation options','Custom custody model','Continuity design options','Named governance','Custom integrations','Executive service review']}
 ],
 evidence:[
  {id:'EV-DEMO-0001',title:'Sample_Gate_Video.mp4',source:'CCTV / VMS',type:'Video',size:'2.41 GB',caseId:'CASE-DEMO-001',caseName:'Sample Access Review',integrity:'Verified (Simulated)',hold:true,retention:'Policy Controlled',actor:'Demo Evidence Manager',hash:'9f7b2c6e2e1a8f0b4c6d9e7f3a7c2d6f1b3e9a8c7d6e5f4a3b2c1d0e9f8a7b6c',thumb:'assets/cctv-evidence.jpg'},
  {id:'EV-DEMO-0002',title:'Sample_Mailbox_Export.eml',source:'Enterprise Email',type:'Email',size:'14.8 MB',caseId:'CASE-DEMO-002',caseName:'Sample Compliance Review',integrity:'Verified (Simulated)',hold:true,retention:'Policy Controlled',actor:'Demo Investigator',hash:'8d67f7a823c91e6a3f2d1847c0b9e5f6328a4d9f7b3e1c5a0d8f9b2c6a3e7d4f8c1'},
  {id:'EV-DEMO-0003',title:'Sample_Transaction_Record.pdf',source:'Files & Folders',type:'Document',size:'1.20 MB',caseId:'CASE-DEMO-002',caseName:'Sample Compliance Review',integrity:'Verified (Simulated)',hold:false,retention:'Policy Controlled',actor:'Demo Evidence Manager',hash:'78fac1e9b3d57a9c2e4b6d8f0a1c3e5b7d9f2a4c6e8b0d1f3a5c7e9b2d4f6a8c0e1'},
  {id:'EV-DEMO-0004',title:'Sample_Access_Events.json',source:'Security Logs',type:'Log',size:'2.40 MB',caseId:'CASE-DEMO-001',caseName:'Sample Access Review',integrity:'Verified (Simulated)',hold:false,retention:'Policy Controlled',actor:'Automated Ingestion Service',hash:'3a91b7d20f4c6e8a1b3d5f7c9e2a4b6d8f0c1e3a5b7d9f2c4e6a8b0d1f3c5e7a9b2'},
  {id:'EV-DEMO-0005',title:'Sample_Device_Image.E01',source:'Manual Upload',type:'Disk Image',size:'42.81 GB',caseId:'CASE-DEMO-003',caseName:'Sample Device Review',integrity:'Verified (Simulated)',hold:true,retention:'Policy Controlled',actor:'Demo Investigator',hash:'9c12aa783e5b7d9f2a4c6e8b0d1f3a5c7e9b2d4f6a8c0e1b3d5f7a9c2e4b6d8f0a1'},
  {id:'EV-DEMO-0006',title:'Sample_System_Export.csv',source:'Database Export',type:'Dataset',size:'486 MB',caseId:'CASE-DEMO-004',caseName:'Sample Reconciliation',integrity:'Verified (Simulated)',hold:false,retention:'Policy Controlled',actor:'Demo API Client',hash:'e1b30d9f5a7c9e2b4d6f8a0c1e3b5d7f9a2c4e6b8d0f1a3c5e7b9d2f4a6c8e0b1d'}
 ],
 cases:[
  {id:'CASE-DEMO-001',name:'Sample Access Review',owner:'Demo Investigator',status:'Active',evidence:1284,priority:'High'},
  {id:'CASE-DEMO-002',name:'Sample Compliance Review',owner:'Demo Evidence Manager',status:'Active',evidence:724,priority:'High'},
  {id:'CASE-DEMO-003',name:'Sample Device Review',owner:'Demo Investigator',status:'Under Review',evidence:428,priority:'Medium'},
  {id:'CASE-DEMO-004',name:'Sample Reconciliation',owner:'Demo Auditor',status:'Active',evidence:876,priority:'Medium'}
 ],
 connectors:[
  {name:'CCTV / VMS',status:'Connected',detail:'Demo source'},{name:'Files & Folders',status:'Connected',detail:'Demo repository'},{name:'Enterprise Email',status:'Available',detail:'Optional connector'},{name:'Security Logs',status:'Connected',detail:'Demo endpoint'},{name:'Secure API',status:'Connected',detail:'Demo client'},{name:'Database Export',status:'Available',detail:'Optional connector'}
 ],
 users:[
  {name:'Demo Platform Admin',email:'platform.admin@example.invalid',role:'Platform Admin',mfa:'Verified'},
  {name:'Demo Evidence Manager',email:'evidence.manager@example.invalid',role:'Evidence Manager',mfa:'Verified'},
  {name:'Demo Investigator',email:'investigator@example.invalid',role:'Investigator',mfa:'Verified'},
  {name:'Demo Auditor',email:'auditor@example.invalid',role:'Auditor',mfa:'Verified'}
 ],
 exports:[
  {id:'EXP-DEMO-001',name:'Sample Verification Package',requestor:'Demo Evidence Manager',destination:'Secure Download',size:'22.47 GB',status:'Ready'},
  {id:'EXP-DEMO-002',name:'Sample Review Package',requestor:'Demo Investigator',destination:'Controlled Transfer',size:'18.92 GB',status:'Verified'}
 ],
 architecture:[
  {name:'Secure Access Layer',capability:'Protected portal and API access',purpose:'Controls approved access paths'},
  {name:'Isolated Network Layer',capability:'Segmentation and private connectivity',purpose:'Separates workloads and data flows'},
  {name:'Application Services',capability:'Portal, APIs and workflow services',purpose:'Operates tenant workflows and verification'},
  {name:'Key Custody Layer',capability:'Root trust and tenant-scoped keys',purpose:'Protects encryption keys within approved boundaries'},
  {name:'Immutable Evidence Vault',capability:'Immutable object storage and versioning',purpose:'Preserves encrypted evidence and references'},
  {name:'Continuity Layer',capability:'Backup and recovery design',purpose:'Supports controlled recovery and service continuity'}
 ]
};
