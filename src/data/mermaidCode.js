export const DEFAULT_MERMAID_CODE = `flowchart TD
    subgraph TOP[" "]
        style TOP fill:none,stroke:none
        A1["Order history DB<br/><sup>Real transaction data</sup>"]
        A2["Product catalog DB<br/><sup>Live inventory</sup>"]
        A3["AI discovery engine<br/><sup>Classified barrier data</sup>"]
    end

    B1["Occasion & adjacency<br/><sup>Weekly reasoning job</sup>"]
    B2["Precomputed store<br/><sup>Suggestion cache</sup>"]

    A1 --> B1
    A2 --> B1
    A3 --> B1
    B1 --> B2

    subgraph LIVE_LAYER[" "]
        style LIVE_LAYER fill:none,stroke:none
        C2["Reassurance lines"]
        C1{"Lookup service"}
        C3["Fallback logic"]
        C2 --> C1
        C3 --> C1
    end

    B2 --> C1

    G["Guardrails<br/><sup>Latency, returns</sup>"]
    C1 -.-> G

    subgraph APP["Blinkit app — production surfaces"]
        D1["Search results"]
        D3["Cart review"]
        D2["Product detail"]
        D4["Order confirmation"]

        D1 --> D2
        D3 --> D4
        D2 --> D4
    end

    C1 --> D1
    C1 --> D3

    classDef batch fill:#1b4985,stroke:#0f2b54,color:#ffffff,font-weight:bold
    classDef liveBox fill:#07593e,stroke:#043827,color:#ffffff,font-weight:bold
    classDef liveDiamond fill:#05402d,stroke:#02291c,color:#ffffff,font-weight:bold
    classDef guard fill:#7c2d12,stroke:#451a0a,color:#ffffff,font-weight:bold
    classDef app fill:#3c3689,stroke:#262259,color:#ffffff,font-weight:bold

    class A1,A2,A3,B1,B2 batch
    class C2,C3 liveBox
    class C1 liveDiamond
    class G guard
    class D1,D2,D3,D4 app`
