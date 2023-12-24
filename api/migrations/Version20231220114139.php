<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231220114139 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE activity_monitor (activity_id INT NOT NULL, monitor_id INT NOT NULL, INDEX IDX_E147EF6581C06096 (activity_id), INDEX IDX_E147EF654CE1C902 (monitor_id), PRIMARY KEY(activity_id, monitor_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE activity_monitor ADD CONSTRAINT FK_E147EF6581C06096 FOREIGN KEY (activity_id) REFERENCES activity (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE activity_monitor ADD CONSTRAINT FK_E147EF654CE1C902 FOREIGN KEY (monitor_id) REFERENCES monitor (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE activity DROP FOREIGN KEY FK_AC74095A4CE1C902');
        $this->addSql('DROP INDEX IDX_AC74095A4CE1C902 ON activity');
        $this->addSql('ALTER TABLE activity DROP monitor_id');
        $this->addSql('ALTER TABLE activity_type CHANGE numbermonitors numbermonitors VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE activity_monitor DROP FOREIGN KEY FK_E147EF6581C06096');
        $this->addSql('ALTER TABLE activity_monitor DROP FOREIGN KEY FK_E147EF654CE1C902');
        $this->addSql('DROP TABLE activity_monitor');
        $this->addSql('ALTER TABLE activity ADD monitor_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE activity ADD CONSTRAINT FK_AC74095A4CE1C902 FOREIGN KEY (monitor_id) REFERENCES monitor (id)');
        $this->addSql('CREATE INDEX IDX_AC74095A4CE1C902 ON activity (monitor_id)');
        $this->addSql('ALTER TABLE activity_type CHANGE numbermonitors numbermonitors INT NOT NULL');
    }
}
