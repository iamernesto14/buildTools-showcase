export interface BuildTool {
  name: string;
  description: string;
  use_cases: string[];
  key_features: string[];
  website: string;
  icon_url: string;
  category: string;
}

export interface BuildToolsData {
  build_tools: BuildTool[];
}
