CREATE TABLE [dbo].[Cases] (
    [ID] INT NOT NULL IDENTITY,
    [CaseID]   NVARCHAR (128) NOT NULL,
    [Step]     NVARCHAR (MAX) NULL,
    [CaseType] NVARCHAR (MAX) NULL,
    [Role]     NVARCHAR (MAX) NULL,
    [Time]     INT            NOT NULL,
    [Date]     DATETIME       NOT NULL,
    [IsOBL]    BIT            NOT NULL,

    CONSTRAINT [PK_dbo.Cases] PRIMARY KEY CLUSTERED ([ID])
);

